import axios from '../config/axios'

export const startRegister=(formData, redirect)=>{
    return (dispatch)=>{
        axios.post('/users/register', formData)
        .then(response => {
            if(response.data.errors) {
                alert(response.data.message)
            } else {
                redirect()
            }
        })
        .catch(err => alert(err))
    }
}

export const setUser = (user)=>{
    return {type:'SET_USER', payload:user}
}

export const startSetUser =()=>{
return (dispatch)=>{
    axios.get('/users/account',{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then((response)=>{
        const user= response.data
        dispatch(setUser(user))
    })
}
}

export const startLogin = (formData, redirect)=>{
    return (dispatch)=>{
        axios.post('/users/login', formData)
        .then(response => {
            if(response.data.error) {
                alert(response.data.error)
            } else {
                const token = response.data.token
                localStorage.setItem('authToken', token)
                
                axios.get('/users/account', {
                    headers:{
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
                .then((response)=>{
                    const user= response.data
                    dispatch(setUser(user))
                    redirect()
                })
            }
        })
        .catch(err => alert(err))
    }

}

