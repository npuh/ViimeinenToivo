﻿import React, { Component } from "react";
import "./Style.css";
import ActivityFormTesti from "./ActivityFormTesti";
import ActivitiesList from "./ActivitiesList";
import $ from "jquery";
import Modifyactivity from './Modifyactivity';

const apiurl = "api/Activities";

class NmWorkoutActivity extends Component {

    constructor() {
        super();
        this.state = { userdata: [], searchdata: [] };
    }

    componentWillMount() {
        this.getUserData();
        this.getUserSearchData();

    }

    componentDidMount() {
        this.getUserData();
        this.getUserSearchData();
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

    getUserSearchData() {
        $.ajax({
            url: "api/Activities/ByWorkId/" + this.props.workoutid,
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({ searchdata: data }, function () {
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

    deleteActivity(activityId) {
        return fetch("api/Activities/" + activityId, {
            method: "DELETE"
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

    deleteActivityDel = removableId => {
        this.deleteActivity(removableId).then(
            function (response) {
                this.getUserData();
            }.bind(this)
        );
    };

    addToWorkOut(activityId, callback) {
        return fetch("api/NmWorkoutActivities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                workoutId: this.props.workoutid,
                activityId: activityId
            })
        }).then(function (response) {
            callback(response.status);
        });
    }

    newActivity = newactivity => {
        this.addToWorkOut(
            newactivity,
            function () {
                this.getUserSearchData();
            }.bind(this)
        );
    };


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
        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col">
                        <h1 className="h1">{this.props.workoutname}</h1>
                        <ActivitiesList
                            userdata={this.state.searchdata}
                            remove={this.deleteActivity}
                            add={this.newActivity}
                            editactivity={this.updateEntry}
                        />
                      
                        <h1 className="h1">Liikepankki</h1>
                        <ActivitiesList
                            userdata={this.state.userdata}
                            remove={this.deleteActivity}
                            add={this.newActivity}
                            editactivity={this.updateEntry}
                            />
                        <ActivityFormTesti saveActivity={this.luoActivity} />
                    </div>
                </div>
            </div>

        );
    }
}

export default NmWorkoutActivity;
