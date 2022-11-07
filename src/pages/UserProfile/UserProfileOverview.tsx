import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useAuth } from '../../context/useAuth'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { useUserInformationQuery } from '../../graphQL/query/useUserInformationQuery';
import { Action, State, UserInformatation } from './UserProfileTypes';
import { useSaveUserInformationMutation } from '../../graphQL/mutation/useSaveUserInformationMutation';
import ImageUpload from '../../components/ImageUpload';
import UserClaim from '../../components/user/UserClaim';
import { Toast } from 'primereact/toast';
import UserAddress from '../../components/user/UserAddress';
import { useParams } from 'react-router-dom';

const initialState : State = {
    userId: null,
    userInformation: { id: '', userName: '', email: '', cartAmount: 0, points: 0, address: [], claims: [],isAdmin:false,imagePath:'' },
    activeIndex: 0
}

const reducer = (state:State, action:Action) : State => {
    switch (action.type) {
        case 'UPDATE-USERID':
            return {
                ...state,
                userId: action.Id
            }
        case 'INITIALIZE-USERINFORMATION':
            return {
                ...state,
                userInformation: action.userInfo
            }
        case 'UPDATE-USERINFORMATION':
            return {
                ...state,
                userInformation: { ...state.userInformation, [action.field]: action.value }
            }
        case 'UPDATE-ACTIVE-INDEX-ADDRESS':
            return {
                ...state,
                activeIndex: state.userInformation.address.findIndex((element) => element.isActive === true)
            }
        default:
            return state
    }
}

const UserProfileOverview = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const getUserContext = useAuth()
    let user = null;
    const toast = useRef<any>(null);
    const { userId } = useParams();
    const [ imagePath,setImagePath ] = useState<string>("");
    //console.log("userId from seacrch params"+ userId);
   
    const { loading, error, data } = useUserInformationQuery(state.userId!);
    const [saveUserInfo] = useSaveUserInformationMutation();

    useEffect(()=>{
        if(data !== undefined){
            debugger
            let image = process.env.REACT_APP_SERVER_IMAGE_PATH + data.userInformation.imagePath
            setImagePath(image);
        }
        
    },[data]);

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Success Message', detail:'Saved User', life: 3000});
    }

    const showError  = () => {
        toast.current.show({severity:'error', summary: 'Error Message', detail:'Error while saving user', life: 3000});
    }


    //once the promise gets the value then
    useEffect(() => {

        async function getUserFromToken() {
            user = await getUserContext.getUser()

            if (user !== null) {
                if(userId === undefined){
                    dispatch({ type: 'UPDATE-USERID', Id: user["profile"].userId })
                }else{
                    dispatch({ type: 'UPDATE-USERID', Id: userId??'' })
                }
            }
        }

        getUserFromToken()

        if ((data !== null) && (data !== undefined)) {
            dispatch({ type: 'INITIALIZE-USERINFORMATION', userInfo: data.userInformation })

            dispatch({ type: 'UPDATE-ACTIVE-INDEX-ADDRESS' })
        }
    }
        , [user, data])

    //const [checked, setChecked] = useState(false)

    //console.log( 'userInformation' + state.userInformation)

    const handleInput = (event: any ) => {
        dispatch({ type: 'UPDATE-USERINFORMATION', field: event.target.name, value: event.target.value })
    }

    const saveUserInformation = () => {
        //console.log(userInfo)
        saveUserInfo({
            variables: {
                saveUser: {
                    id: state.userInformation.id,
                    userName: state.userInformation.userName,
                    email: state.userInformation.email,
                    cartAmount: state.userInformation.cartAmount,
                    points: state.userInformation.points,
                    isAdmin: state.userInformation.isAdmin
                }
            }
        })
        .then((res) => {
            //debugger
            showSuccess();
        })
        .catch((err) => {
            //debugger
            showError();
        })
    }

    //console.log('User overview called')
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;
    //if (uerror) { console.log(error) }

    if (state.userInformation !== undefined) {
        return (
            <React.Fragment>
            <Toast ref={toast} />
            <Card title="Welcome to the Content Management Dashboard" subTitle="User Profile">
                <div className='grid p-fluid'>
                    <div className='col-5'>
                        <Image src={imagePath} alt="Image" width="250" preview />
                    </div>
                    <div className='col-7'>
                        <div className='col-12'>
                            <h5>Username</h5>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText
                                    name="userName"
                                    value={state.userInformation.userName}
                                    onChange={(e) => handleInput(e)}
                                    placeholder="Username" />
                            </div>
                        </div>
                        <div className='col-12'>
                            <h5>Email</h5>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">www</span>
                                <InputText
                                    name="email"
                                    value={state.userInformation.email}
                                    placeholder="Email"
                                    onChange={(e) => handleInput(e)} />
                            </div>
                        </div>
                        <div className='col-12'>
                            <h5>Cart Amount</h5>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">$</span>
                                <InputNumber
                                    name="cartAmount"
                                    placeholder="CartAmount"
                                    value={state.userInformation.cartAmount}
                                    onValueChange={(e) => handleInput(e)} />
                            </div>
                        </div>
                        <div className='col-12'>
                            <h5>Points</h5>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">$</span>
                                <InputNumber
                                    name="points"
                                    placeholder="Points"
                                    value={state.userInformation.points}
                                    onValueChange={(e) => handleInput(e)}
                                />
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className="field-checkbox">
                                <Checkbox
                                    name="active"
                                    inputId="binary"
                                    onChange={(e) => handleInput(e)}
                                    checked={state.userInformation.isAdmin}></Checkbox>
                                <label htmlFor="binary">Admin</label>
                            </div>
                        </div>
                    </div>
                    <div className='p-col-4 col-offset-5'>
                        <Button label="Save" className="p-button-rounded" onClick={() => saveUserInformation()} />
                    </div>
                </div>

                <div className='grid p-fluid'>
                    <div className='p-col-12 w-full'>
                        <ImageUpload userId={state.userInformation.id}/>
                    </div>
                </div>

                <div className="grid p-fluid App-Logo">
                    <UserClaim userClaims={state.userInformation.claims} />
                </div>

                <UserAddress getUserAddress={state.userInformation.address} getActiveIndex={state.activeIndex} />

            </Card>
            </React.Fragment>
        )
    }
    else {
        return <p>Loading UserInformation....</p>
    }
}

export default UserProfileOverview