import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};
function Welcome(props) {
    console.log(props);
    return <h1>Hello, {props.name}</h1>;
}

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state={date:new Date()};
    }
    render(){
        return (
            <div>
                <p> The time is {this.state.date.toLocaleString()}</p>
            </div>
        )
    }
}

const element =
    (<div>
    <Clock />
    <Welcome name="Sara" age="18" gender="female"/>
    </div>);
ReactDOM.render(
    element,
    document.getElementById('root')
);