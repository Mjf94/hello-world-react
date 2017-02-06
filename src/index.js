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

class NumList extends React.Component {
    render() {
        const nums = [1, 2, 3, 4, 5];
        const numList = nums.map((number) => <li key={number.toString()}>{number * 3}</li>)
        return (<div>
            <ul>{numList}</ul>
        </div>)
    }
}
//Read more about uncontrolled component for alternative method
class SampleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', text: 'Write something', choice: 'A'};
        //this.handleChange = this.handleChange.bind(this);

    }

    /*
    too complicated
    handleValue(event) {
        this.setState({value: event.target.value})
    }

    handleText(event) {
        this.setState({text: event.target.value})
    }

    handleChoice(event) {
        this.setState({choice: event.target.value})
    }*/

    /*Handle multiple inputs in one function*/
    handleInput(e){
        let value=e.target.value;
        let attribute=e.target.name;
        //don't forget the []
        this.setState({[attribute]:value});
    }
    handleSubmit(e) {
        console.log("On Submit")
        alert(this.state.value + "\n" + this.state.text+"\n"+this.state.choice);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {/*Remember to pass the event as a parameter in arrow function otherwise the event will be undefined*/}
                    {/*Value: <input type="text" value={this.state.value} onChange={(e) => this.handleValue(e)}/>
                    Text: <input type="text" value={this.state.text} onChange={(e) => this.handleText(e)}/>
                    Selection:
                    <select value={this.state.choice} onChange={(e) => this.handleChoice(e)}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>*/}
                    Value: <input name="value" type="text" value={this.state.value} onChange={(e) => this.handleInput(e)}/>
                    Text: <input name="text" type="text" value={this.state.text} onChange={(e) => this.handleInput(e)}/>
                    Selection:
                    <select name="choice" value={this.state.choice} onChange={(e) => this.handleInput(e)}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                    <button type="submit" value="Submit">Submit</button>
                </form>
            </div>
        )
    }
}


const element =
    (<div>
        <Clock />
        <Toggle/>
        <LogInCtrl/>
        <NumList/>
        <SampleForm/>
        <Welcome name="Sara" age="18" gender="female"/>
    </div>);
ReactDOM.render(
    element,
    document.getElementById('root')
);