var app=angular.module("myApp",["ngMaterial"]);app.controller("AppController",["$scope","$http",function(t,a){a.post("/tasks",{message:"A basic task"}).then(function(t){console.log(t.data),a.get("/tasks").then(function(t){console.log(t.data)})})}]);