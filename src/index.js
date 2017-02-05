import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    linkClick(e) {
        e.preventDefault();
        console.log("On clicked");
    }

    render() {
        return (<div>
            <a href="#" onClick={this.linkClick}>Click this</a>
            <h1>Hello, {this.props.name}</h1>
        </div>);
    }
}
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false};
        //this.handleClick=this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <div>
                <button onClick={() => {
                    this.handleClick()
                }}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
            </div>
        )
    }
}
class Mailbox extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const unreadMessages = this.props.unreadMessages;
        if (unreadMessages.length == 3)
            return null;
        else
            return (
                <div>
                    {unreadMessages.length > 0 && <h2>
                        You have {unreadMessages.length} unread messages.
                    </h2>}
                </div>
            )
    }
}
class Greeting extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const messages = ['React', 'Re: React', 'Re:Re: React'];
        if (this.props.isLoggin)
            return (
                <div>
                    <h2>Welcome Back!</h2>
                    <Mailbox unreadMessages={messages}/>
                </div>
            )
        else
            return (
                <div>
                    <h2>Please sign in!</h2>
                </div>
            )
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return (
            <div>
                <p> The time is {this.state.date.toLocaleString()}</p>
            </div>
        )
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({date: new Date()});
    }
}

class LogInCtrl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoggin: false}
    }

    logIn() {
        this.setState({isLoggin: true});
    }

    logOut() {
        this.setState({isLoggin: false});
    }

    handleClick() {
        if (this.state.isLoggin)
            this.logOut();
        else
            this.logIn();
    }

    render() {
        return (<div>
            <button onClick={() => this.handleClick()}>{this.state.isLoggin ? 'Log Out' : 'Log In'}</button>
            <Greeting isLoggin={this.state.isLoggin}/>
        </div>)
    }
}

class NumList extends React.Component{
    render(){
        const nums=[1,2,3,4,5];
        const numList=nums.map((number)=><li key={number.toString()}>{number*3}</li>)
        return (<div>
            <ul>{numList}</ul>
        </div>)
    }
}

const element =
    (<div>
        <Clock />
        <Toggle/>
        <LogInCtrl/>
        <NumList/>
        <Welcome name="Sara" age="18" gender="female"/>
    </div>);
ReactDOM.render(
    element,
    document.getElementById('root')
);