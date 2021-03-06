import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

import {
    Input,
    Form,
    Button,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Progress,
    Alert,
 } from 'reactstrap';


// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
	quickAdd: true,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

 quickAddCompleted() {
    this.setState({
      quickAdd: !this.state.quickAdd,
    });
  }


 addButtonClicked() {

  }
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
          <Task
              key={task._id}
              task={task}
              showPrivateButton={showPrivateButton}
          />
      );
    });
  }

  render() {
    let completedRatio = 1-this.props.incompleteCount/this.props.totalCount;
    let completedPercentage = (completedRatio*100).toFixed(2);
    return (
        <>
          {/*<DemoNavbar />*/}
          <div>
            <Navbar color="light" light expand="md" className='dark-nav'>
              <NavbarBrand href="/" className='text-center'>Todofy</NavbarBrand>
              <Nav>
                <NavItem className='text-center'>
                  <AccountsUIWrapper />
                </NavItem>
              </Nav>
            </Navbar>
          </div>
          <br />
          <div className='main-section-container container'>
            {this.props.currentUser ?
                <div className="container-fluid shadow-box">
                  <header>
                    <h2 className='text-center'>Todo List ({this.props.incompleteCount}/{this.props.totalCount})</h2>
                  </header>
                  <div>
                    <div className="text-center">{completedPercentage}%</div>
                    <Progress value={completedPercentage} />

                  </div>
  <br />


		<p>
		<div className='custom-control custom-switch'>
			<br/>
	    		<Input
		          type="checkbox"
		          readOnly
       			   className='custom-control-input'
	 		 id='customSwitchesChecked'
		          checked={this.state.quickAdd}
		          onClick={this.quickAddCompleted.bind(this)}
	      		/>
 			<label className='custom-control-label'
			htmlFor='customSwitchesChecked'>
       			</label>
	              	Quick add
		</div>
		</p>

                    {
                        completedRatio==1?
                            <div>
                              
                                <Alert color="success">
                                    <h4 className="alert-heading">Well done!</h4>
                                    <p>
                                        You've completed all the tasks.
                                    </p>
                                    <hr />
                                    <p className="mb-0">
                                        You deserve a cupcake. Go have one.                                    </p>
                                </Alert>
                            </div>
                            :
                            ""
                    }

		{
			this.state.quickAdd?
                  <Form className='text-center' onSubmit={this.handleSubmit.bind(this)}>
                    <Input
                        type="text"
                        ref="textInput"
                        placeholder="Add new task"
                    />
                  </Form>
			: 
			<p>
			<Button variant="primary"
			onClick={this.addButtonClicked.bind(this)} color="primary" size="sm">
				New Task
                    </Button>
    		 	</p>
		}
                  <br/>
                  <div>
                    <p>
		<div className='custom-control custom-switch'>
                      <Input
                          type="checkbox"
                          readOnly
       			   className='custom-control-input'
         		 id='customSwitchesChecked2'
                          checked={this.state.hideCompleted}
                          onClick={this.toggleHideCompleted.bind(this)}
                      />
 <label className='custom-control-label' htmlFor='customSwitchesChecked2'>

        </label>
                           Show Completed Tasks
                            
			</div>
                    </p>
                    <div className='shadow-box-neat'>
                      <ul id='todo-list'>
                        {this.renderTasks()}
                      </ul>
                    </div>
                  </div>
                </div>
                :
                <div className="container-fluid" id="main-section-container">
                  <div className="container-fluid header" id="login-header">
                    <div className="row" id="header">
                      <div className="col">
                        <h1>Todofy</h1>
                        <h2><i>Realtime </i>Todo Manager<br/>
                          <i>Perfect</i> for personal use and collaborative work.
                        </h2>
                      </div>
                    </div>
                    <div className="container px-lg-5">
                      <div className="row mx-lg-n5" id="awesome-features">
                        <div className="col py-4 px-lg-1" id="awesome-features-box">
                          <h2><b>Features</b></h2>
                        </div>
                        <div className="col py-4 px-lg-5 awesome-features-details">
                          <h3><i>Elegant, Fast, Secure.</i></h3>
                          <br />
                          <br />
                          <br />
                          <h4>✓ Secure</h4>
                          <p>Sensitive information, like password, is encrypted before storage.</p>
                          <br />
                          <h4>✓ Realtime</h4>
                          <p>All the changes made by any member are reflected in realtime.</p>
                        </div>
                        <div className="col py-4 px-lg-5 awesome-features-details" id="awesome-features-details">
                          <h4>✓ Free </h4>
                          <p>It's free to use, now and forever!</p>
                          <br />
                          <h4>✓ Clean and Responsive Design </h4>
                          <p>Simple yet elegant design is employed throughout the app. It handles different screen sizes without weird changes in look and feel.</p>
                          <br />
                          <h4>✓ Multi-platform Support </h4>
                          <p>Runs perfectly on web, android and IOS.</p>
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                  <br />
                </div>
              }
          </div>
        </>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    totalCount: Tasks.find({}).count(),
    currentUser: Meteor.user(),
  };
})(App);
