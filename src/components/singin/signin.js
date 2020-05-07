import React from 'react'
import { response } from 'express';

class SignIn extends React.Component {
    constructor(){
        super()
        this.state = {
            signInEmail: " ",
            signInPassword: " "
        }
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    // email input
    onEmailChange(event){
        this.setState({signInEmail: event.target.value})
    }

    //password input
    onPasswordChange(event){
        this.setState({signInPassword: event.target.value})
    }

    // set submit
    onSubmitSignIn = ()=>{
//        Connect to back end
        fetch('http://localhost:3000/signIn',
            {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            }
        )
        .then(response => response.json())
        .then(data => { if(data==="success"){
                this.props.onRouteChange('home')
            }else{
                console.log(" /signIn in server.js got error  ")
            }
        })
      
    }
    
    render(){

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center">
                <main className="pa4 black-80">
                <form className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    onChange ={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                onChange ={this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                            </div>
    
                            </fieldset>
                            <div className="">
                                <input 
                                onClick = {this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"/>
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick = {()=> this.props.onRouteChange('register')} className="f6 link dim black db pointer">Resgister</p>
                         
                            </div>
                        </form>
                </main>
            </article>
    
        );
    }

}

export default SignIn