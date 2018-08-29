﻿import React, { Component } from "react";
import $ from "jquery";
import ActivityForm from './ActivityForm';
import ActivitiesList from "./ActivitiesList";
import './Workout.css';
//import Modifyactivity from "./Modifyactivity";
import ActivityFormTesti from './ActivityFormTesti';
import Listatesti from "./Listatesti";
import Sivutus from './Sivutus';
import Exportti from './Exportti';
import WorkoutForm from "./WorkoutForm";
import WorkoutsList from "./WorkoutsList";
import NmWorkoutActivity from "./NmWorkoutActivity";


const apiurl = "api/Workouts";

class Workout extends Component {


    constructor() {
        super();
        this.state = {
            userdata: [],
            clicked: false,
            workoutid: null

        };
    }

    componentWillMount() {
        this.getUserData();

    }

    componentDidMount() {
        this.getUserData();
        //this.setState({ clicked: false });
    }

    getUserData() {
        $.ajax({
            url: apiurl,
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({ userdata: data }, function () {
                });
            }.bind(this),
            error: function (xhr, status, err) {
            }
        });
    }

    createActivity(activity, callback) {
        return fetch("api/Activities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(activity)
        }).then(function (response) {
            callback(response.status);
        });
    }

    luoActivity = luoactivity => {
        this.createActivity(
            luoactivity,
            function () {
                this.getUserData();
            }.bind(this)
        );
    };

    createWorkout(workout, callback) {
        return fetch("api/Workouts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(workout)
        }).then(function (response) {
            callback(response.status);
        });
    }

    newWorkout = newworkout => {
        this.createWorkout(
            newworkout,
            function () {
                this.getUserData();
            }.bind(this)
        );
    };

    movetoWorkout = (workoutId) => {
        this.setState({ clicked: true });
        this.setState({ workoutid: workoutId });
    }

    modifyActivity(activity, id) {
        console.log(activity);
        console.dir(activity.Activityname);
        return fetch("api/Activities/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(activity)
        }).then(function (response) {
            console.log(response.status);
            //callback(response.status);
        });
    }

    updateEntry = (updatentry, id) => {
        console.dir(updatentry);
        console.log("moro");
        this.modifyActivity(updatentry, id);
        console.log("moikka");
    };

    render() {
        {
            if (this.state.clicked) {
                return <NmWorkoutActivity workoutid={this.state.workoutid} />;
            }
            else {
                return (
                    <div>
                        <Exportti />
                        <div class="container">
                            <div class="row align-items-start">
                                <div class="col">                     
                            <WorkoutForm saveWorkout={this.newWorkout} />
                            <WorkoutsList
                                userdata={this.state.userdata}
                                moveto={this.movetoWorkout}
                            />
                        </div>
                        <div class="col">
                            <ActivityFormTesti saveActivity={this.luoActivity} />
                        </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
}
export default Workout;
