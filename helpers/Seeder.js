var userModel = require('../models/User');
var roomModel = require('../models/Rooms');
var Promise = require('promise');
var behaviorModel = require('../models/Behavior');
var eventsModel = require('../models/EventLog');
var thresholdAuditModel = require('../models/ThresholdAudit');
var occurrenceModel = require('../models/OccurrenceNotes');
var thresholdModel = require('../models/Threshold');
var lastRecordModel = require('../models/LastRecord'); 
var alertLogModel = require('../models/AlertLog');
var settingsModel = require('../models/Setting');
var CONSTANT = require('../utilities/Constant').CONSTANTS;
var mongoose = require('mongoose');
var async = require("async");
var bcrypt   = require('bcrypt-nodejs');
var locals = {};

if(mongoose.connection.readyState=='no'){
    var connection = mongoose.connect('mongodb://localhost/visualdb');
}

function objectFindByKeyAndValue(collection, key, value){
    var len = collection.length;        
    for(var i = 0; i<len; i++){
        var item = collection[i];
        if(item[key] === value) return item;
    }
    return false;
};

function populateDB() {

};

populateDB.prototype.wireToDB = function(){
    return new Promise(function (resolve, reject) {
        var allUsers = [
            {
                username: 'SuperAdmin',
                password: bcrypt.hashSync('test123', bcrypt.genSaltSync(8), null),
                role: 'superadmin',
                status: 'active',
                first_time_login: 0,
                modified_by: "SuperAdmin",
                modified_at: new Date()
            },
            {
                username: 'Officer',
                password: bcrypt.hashSync('test123', bcrypt.genSaltSync(8), null),
                role: 'user',
                status: 'active',
                first_time_login: 0,
                modified_by: "SuperAdmin",
                modified_at: new Date()
            },
            {
                username: 'Admin',
                password: bcrypt.hashSync('test123', bcrypt.genSaltSync(8), null),
                role: 'admin',
                status: 'active',
                first_time_login: 0,
                modified_by: "SuperAdmin",
                modified_at: new Date()
            },
           
        ];

        var roomNos = [39,40,41,42,54,55,56,57];

        var allRooms = [
            {
                room_no: roomNos[0],
                si_ip: '192.168.1.11',
                camera_no: 1,            
                sensor1: 'csv1',
                sensor2: 'csv2',
                no_of_people: 1,
                cmp_people: 0  
                
            },
            {
                room_no: roomNos[1],
                si_ip: '10.11.0.21',            
                camera_no: 2,
                sensor1: 'csv3',
                sensor2: 'csv4',
                no_of_people: 3,
                cmp_people: 0           
            },
            {
                room_no: roomNos[2],
                si_ip: '10.11.0.31',            
                camera_no: 3,
                sensor1: 'csv5',
                sensor2: 'csv6',
                no_of_people: 3,
                cmp_people: 0            
            },
            {
                room_no: roomNos[3],
                si_ip: '10.11.0.41',
                camera_no: 4,            
                sensor1: 'csv7',
                sensor2: 'csv8',
                no_of_people: 3,
                cmp_people: 1
                
            },
            {
                room_no: roomNos[4],
                si_ip: '10.11.0.51',
                camera_no: 5,            
                sensor1: 'csv9',
                sensor2: 'csv10',
                no_of_people: 4,
                cmp_people: 1
            },
            {
                room_no: roomNos[5],
                si_ip: '10.11.0.61',
                camera_no: 6,            
                sensor1: 'csv11',
                sensor2: 'csv12',
                no_of_people: 4,
                cmp_people: 0            
            },
            {
                room_no: roomNos[6],
                si_ip: '10.11.0.71',
                camera_no: 7,            
                sensor1: 'csv13',
                sensor2: 'csv14',
                no_of_people: 4,
                cmp_people: 0             
            },
            {
                room_no: roomNos[7],
                si_ip: '10.11.0.81',
                camera_no: 8,            
                sensor1: 'csv15',
                sensor2: 'csv16',
                no_of_people: 3,
                cmp_people: 1,
               
            }
        ];

        var behaviourLevels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

        var allBehaviours = [
            {
                behavior_level: behaviourLevels[0],
                behavior: 'Hang Object',
                caption: 'Hang Object',
                sop: "Deploy an officer to check on the cell. Stand by to activate Code Blue.",
                img_file: 'hanging-the-object',
                by_va: 'Yes',
                by_aa: 'No'

            },

            {
                behavior_level: behaviourLevels[1],
                behavior: 'Fight',
                caption: 'Fight',
                sop: "Deploy reinforcements to the cell. Stand by to receive IRT.",
                img_file: 'fighting',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {            
                behavior_level: behaviourLevels[2],
                behavior: 'Collapse',
                caption: 'Collapse',
                sop: "Deploy an officer to check on the cell. Stand by to activate the Staff Nurse.",
                img_file: 'collapse',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[3],
                behavior: 'Climb Partition Wall',
                caption: 'Climb Partition Wall',
                sop: "Deploy an officer to check on the cell.",
                img_file: 'climb-low-wall',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[4],
                behavior: 'Disrupt System',
                caption: 'Disrupt System',
                sop: "Deploy an officer to check on the cell.",
                img_file: 'attempt-to-disrupt',
                by_va: 'Yes',
                by_aa: 'No'
            },
            
            {
                behavior_level: behaviourLevels[5],
                behavior: 'Bang Head Wall/Door',
                caption: 'Bang Head Wall/Door',
                sop: "Deploy an officer to check on the cell. Stand by to activate the Staff Nurse.",
                img_file: 'banging-the-head',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[6],
                behavior: 'Kick Wall/Door',
                caption: 'Kick Wall/Door',
                sop: "Deploy an officer to check on the cell.",
                img_file: 'kicking',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[7],
                behavior: 'Occlude Head',
                caption: 'Occlude Head',
                sop: "Deploy an officer to check on the cell. Stand by to activate the Staff Nurse.",
                img_file: 'head-occluded',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[8],
                behavior: 'Throw Object',
                caption: 'Throw Object',
                sop: "Deploy an officer to check on the cell.",
                img_file: 'throwing',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[9],
                behavior: 'Groan',
                caption: 'Groan',
                sop: "Deploy an officer to check on the cell.",
                img_file: 'groaning',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[10], /**  NOT USED IN NEW CSV **/
                behavior: 'Aggression',
                caption: 'Aggression',
                sop: "Deploy an officer to check on the cell.",
                img_file: 'aggression',
                by_va: 'No',
                by_aa: 'Yes'
            },

            {
                behavior_level: behaviourLevels[11],
                behavior: 'Wave',
                caption: 'Wave',
                sop: "Communicate with the inmate through the cell intercom",
                img_file: 'wave',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[12],
                behavior: 'Stand Up',
                caption: 'Stand Up',
                sop: "Monitor the situation in the cell and if required, deploy an officer to check on the cell.",
                img_file: 'standing-during-unlit',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[13],
                behavior: 'Guard Present',
                caption: 'Guard Present',
                sop: "Monitor the situation in the cell.",
                img_file: 'officer-present',
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[14],    /**  NOT USED IN NEW CSV **/
                behavior: 'Extra People',
                caption: 'Extra People',
                sop: "Extra people.",
                img_file: 'extra-people',            
                by_va: 'Yes',
                by_aa: 'No'
            },

            {
                behavior_level: behaviourLevels[15],    /**  NOT USED IN NEW CSV **/
                behavior: 'People Missing',
                caption: 'People Missing',
                sop: "People Missing.",
                img_file: 'people-missing',
                by_va: 'Yes',
                by_aa: 'No'
            },
            {
                behavior_level: behaviourLevels[16],    /**  NOT USED IN NEW CSV **/
                behavior: 'Stressed Voice',
                caption: 'Stressed Voice',
                sop: "Stressed Voice.",
                img_file: 'shouting',
                by_va: 'Yes',
                by_aa: 'No'
            }
        ];

        var curDate = new Date();
        var year = curDate.getFullYear();
        var month = curDate.getMonth();
        var date = curDate.getDate();
        var date1 = new Date(year, month, date - 5, 13, 00, 00);

        var allThresholds = [
            {
                room_id: mongoose.Types.ObjectId("54cb604c3099c8a80dac3f47"),
                updated_by: mongoose.Types.ObjectId("54c8c2aac7809bec222f3b11"),
                behavior_id: mongoose.Types.ObjectId("54cb5a263bb97fa818913a41"),
                confidence: 0.001,
                frequency: 3,
                updated_date: date1
            } 
        ];     


        var start_date1 = new Date(year, month, date, 12, 00, 00);
        var end_date1 = new Date(year, month, date, 12, 01, 00);

        var start_date2 = new Date(year, month, date, 13, 00, 00);
        var end_date2 = new Date(year, month, date, 13, 01, 00);

        var start_date3 = new Date(year, month, date, 14, 00, 00);
        var end_date3 = new Date(year, month, date, 14, 01, 00);

        var start_date4 = new Date(year, month, date, 15, 00, 00);
        var end_date4 = new Date(year, month, date , 15, 01, 00);

        var start_date5 = new Date(year, month, date, 16, 00, 00);
        var end_date5 = new Date(year, month, date, 16, 01, 00);

        var superAdminUserId = mongoose.Types.ObjectId("54ca12f60a58b22410110f91");

        var roomRandomArray = [39,40,41];

        var allAlerts = [
            {
                room_id: mongoose.Types.ObjectId("54ca12f60a58b22410110f90"),
                behavior_id: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                sensor_name: 'Sensor 1',
                alert_status: 'new',
                start_datetime: start_date1.getTime(),
                end_datetime: end_date1.getTime(),
                acknowleged_datetime: end_date1,
                acknowleged_by: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                priority: 2,
                confidence_value: '0',
                notes: '',
                actual_no_of_people: 1,
                no_of_people: 1,
                current_notification: 0
            },
            {
                room_id: mongoose.Types.ObjectId("54ca12f60a58b22410110f91"),
                behavior_id: mongoose.Types.ObjectId("54d0b938b008748013f7d99b"),
                sensor_name: 'Sensor 1',
                alert_status: 'new',
                start_datetime: start_date2,
                end_datetime: end_date2,
                acknowleged_datetime: end_date2,
                acknowleged_by: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                priority: 2,
                confidence_value: '0',
                notes: '',
                actual_no_of_people: 1,
                no_of_people: 1,
                current_notification: 0
            },
            {
                room_id: mongoose.Types.ObjectId("54ca12f60a58b22410110f91"),
                behavior_id: mongoose.Types.ObjectId("54d0b938b008748013f7d996"),
                sensor_name: 'Sensor 1',
                alert_status: 'new',
                start_datetime: start_date3,
                end_datetime: end_date3,
                acknowleged_datetime: end_date3,
                acknowleged_by: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                priority: 2,
                confidence_value: '0',
                notes: '',
                actual_no_of_people: 1,
                no_of_people: 1,
                current_notification: 0
            },
            {
                room_id: mongoose.Types.ObjectId("54ca12f60a58b22410110f91"),
                behavior_id: mongoose.Types.ObjectId("54d0b938b008748013f7d99d"),
                sensor_name: 'Sensor 1',
                alert_status: 'new',
                start_datetime: start_date4,
                end_datetime: end_date4,
                acknowleged_datetime: end_date4,
                acknowleged_by: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                priority: 2,
                confidence_value: '0',
                notes: '',
                actual_no_of_people: 1,
                no_of_people: 1,
                current_notification: 0
            },
            {
                room_id: mongoose.Types.ObjectId("54ca12f60a58b22410110f91"),
                behavior_id: mongoose.Types.ObjectId("54d0b938b008748013f7d991"),
                sensor_name: 'Sensor 1',
                alert_status: 'new',
                start_datetime: start_date5,
                end_datetime: end_date5,
                acknowleged_datetime: end_date5,
                acknowleged_by: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                priority: 2,
                confidence_value: '0',
                notes: '',
                actual_no_of_people: 1,
                no_of_people: 1,
                current_notification: 0
            },
            {
                room_id: mongoose.Types.ObjectId("54ca12f60a58b22410110f91"),
                behavior_id: mongoose.Types.ObjectId("54d0b938b008748013f7d991"),
                sensor_name: 'Sensor 1',
                alert_status: 'new',
                start_datetime: start_date5,
                end_datetime: end_date5,
                acknowleged_datetime: end_date5,
                acknowleged_by: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                priority: 2,
                confidence_value: '0',
                notes: '',
                actual_no_of_people: 1,
                no_of_people: 1,
                current_notification: 0
            },
            {
                room_id: mongoose.Types.ObjectId("54ca12f60a58b22410110f91"),
                behavior_id: mongoose.Types.ObjectId("54d0b938b008748013f7d991"),
                sensor_name: 'Sensor 1',
                alert_status: 'new',
                start_datetime: start_date5,
                end_datetime: end_date5,
                acknowleged_datetime: end_date5,
                acknowleged_by: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                priority: 2,
                confidence_value: '0',
                notes: '',
                actual_no_of_people: 1,
                no_of_people: 1,
                current_notification: 0
            },
            {
                room_id: mongoose.Types.ObjectId("54ca12f60a58b22410110f91"),
                behavior_id: mongoose.Types.ObjectId("54d0b938b008748013f7d991"),
                sensor_name: 'Sensor 1',
                alert_status: 'new',
                start_datetime: start_date5,
                end_datetime: end_date5,
                acknowleged_datetime: end_date5,
                acknowleged_by: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                priority: 2,
                confidence_value: '0',
                notes: '',
                actual_no_of_people: 1,
                no_of_people: 1,
                current_notification: 0
            },
            {
                room_id: mongoose.Types.ObjectId("54ca12f60a58b22410110f91"),
                behavior_id: mongoose.Types.ObjectId("54d0b938b008748013f7d991"),
                sensor_name: 'Sensor 1',
                alert_status: 'new',
                start_datetime: start_date5,
                end_datetime: end_date5,
                acknowleged_datetime: end_date5,
                acknowleged_by: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                priority: 2,
                confidence_value: '0',
                notes: '',
                actual_no_of_people: 1,
                no_of_people: 1,
                current_notification: 0
            },
            {
                room_id: mongoose.Types.ObjectId("54ca12f60a58b22410110f91"),
                behavior_id: mongoose.Types.ObjectId("54d0b938b008748013f7d991"),
                sensor_name: 'Sensor 1',
                alert_status: 'new',
                start_datetime: start_date5,
                end_datetime: end_date5,
                acknowleged_datetime: end_date5,
                acknowleged_by: mongoose.Types.ObjectId("54d0b938b008748013f7d993"),
                priority: 2,
                confidence_value: '0',
                notes: '',
                actual_no_of_people: 1,
                no_of_people: 1,
                current_notification: 0
            }
        ];
        var thatpop=this;
        async.series([
            function(callback){
                userModel.find({}, function (err, users) {
                    if (users) {
                        // console.log('Users : ' + users.length);
                        if (users.length === 0) {
                            var allUsersLength = allUsers.length;                            
                            async.forEach(allUsers, function(eachUser, callback) {                    
                                var dummyUser = new userModel(eachUser); 
                                dummyUser.save(function (err, user) {
                                    if(user.username=='SuperAdmin'){
                                        locals.user_id=user._id;                            
                                    }          
                                    console.log("User insertion Id: "+user._id);
                                    callback();             
                                });
                            }, callback); 
                            
                        }else{                        
                            // console.log(users.length + ' users exist.');                        
                            var resultObj = objectFindByKeyAndValue(users, 'role', 'superadmin');                                                                            
                            locals.user_id=resultObj    ._id;
                            callback(); 
                        }
                    }
                }); 
            },
            function(callback){
                roomModel.find({}, function (err, rooms) {
                    if (rooms) {                    
                        // console.log('Rooms : ' + rooms.length);
                        if (rooms.length === 0) {                        
                            locals.rooms = [];
                            async.forEach(allRooms, function(eachRoom, callback) {                        
                                var dummyRoom = new roomModel(eachRoom);
                                dummyRoom.save(function (err, room) {                              
                                   locals.rooms.push({"_id": room._id, 'room_no': room.room_no});                               
                                   console.log("Room insertion Id: "+room._id);
                                   callback();  
                                });                         
                            },callback); 
                        }else{
                           //locals.rooms.push({"room_id": room._id});
                            locals.rooms=rooms;        
                            // console.log(rooms.length + ' Rooms exist.');
                            callback();
                        }
                    } 
                }); 
            },
            
            function(callback){
                // do some more stuff ... 

                behaviorModel.find({}, function (err, behaviors) {
                    if (behaviors) {
                        // console.log('Behaviors : ' + behaviors.length);
                        var allBehavioursLength = allBehaviours.length;
                        locals.behaviours = {};
                        if(behaviors.length === 0){                        
                            locals.behaviours = [];                        
                            async.forEach(allBehaviours, function(eachBehaviour, callback) {                           
                                var dummyBehaviour = new behaviorModel(eachBehaviour);
                                dummyBehaviour.save(function (err, behaviour) {
                                   locals.behaviours.push({"_id": behaviour._id, "behavior": behaviour.behavior});
                                   console.log("Behavior insertion Id: "+behaviour._id);
                                   callback();  
                                });                         
                            },callback);  
                        }else {
                            locals.behaviours=behaviors;                        
                            // console.log(behaviors.length + ' behaviors exist.');
                            callback();
                        }
                    }
                }); 
            },
            
            function(callback){
                // do some more stuff ... 

                thresholdModel.find({}, function (err, thresholds) {
                    if (thresholds) {
                        // console.log('Thresholds : ' + thresholds.length);
                        if (thresholds.length === 0) {                         
                            //console.log(locals.rooms);
                            var arrayToMap = locals.rooms;
                            //var mappedArray = arrayToMap.map(function (item) { return item.el; });
                            async.forEach(locals.rooms, function(eachRoom, callback) {      
                                console.log(eachRoom);
                                async.forEach(locals.behaviours, function(eachBehaviour, callback) {                        
                                    var dummyTreshold = new thresholdModel(allThresholds[0]);                                
                                    dummyTreshold.room_id=eachRoom._id;
                                    dummyTreshold.updated_by=locals.user_id;
                                    dummyTreshold.behavior_id=eachBehaviour._id;
                                    dummyTreshold.save(function (err, threshold) {                        
                                        console.log("Threshold insertion Id: "+threshold._id);
                                        callback();  
                                    });                       
                                },callback);           
                            },callback);  
                        }
                        else {
                            // console.log(thresholds.length + ' thresholds exist.');
                            callback();  
                        }
                    }
                }); 
            },

            /*function(callback){
                //do some more stuff ... 
                alertLogModel.find({}, function (err, alertLogs) {
                    if (alertLogs) {            
                        if(alertLogs.length === 0){ 
                            async.forEach(allAlerts, function(eachAlert, callback) {                        
                                var dummyAlert = new alertLogModel(eachAlert);                            
                                //var result_room = objectFindByKeyAndValue(locals.rooms, 'room_no', 39);
                                var result_room = objectFindByKeyAndValue(locals.rooms, 'room_no', roomRandomArray[Math.floor(Math.random() * roomRandomArray.length)]);
                                var result_behav = objectFindByKeyAndValue(locals.behaviours, 'behavior', 'Fight');
                                dummyAlert.room_id=result_room._id;
                                dummyAlert.acknowleged_by=locals.user_id;
                                dummyAlert.behavior_id=result_behav._id;                            
                                dummyAlert.save(function (err, alert) {                        
                                    console.log("AlertLog  insertion Id: "+alert._id);
                                    callback();  
                                });                   
                            },callback);   
                        }
                        else {
                            // console.log(alertLogs.length + ' alert Logs exist.');
                            callback();
                        }
                    }
                });
            },*/
            function(callback){
                settingsModel.find({}, function (err, settings) {
                    if (settings) {
                        // console.log('Settings : ' + settings.length);
                        if (settings.length === 0) {
                            var commonPathSetting = new settingsModel({
                                'settingname':'csvcommonpath',
                                'settingvalue':__dirname + '/../csv',
                                modified_by: 'SuperAdmin',
                                modified_at: new Date(),
                                status: 'active'
                            });
                            commonPathSetting.save(function (err, setting) {
                                console.log("Setting insertion Id: "+setting._id);
                                callback();
                            });
                        }else{
                            // console.log(settings.length + ' settings exist.');
                            callback();
                        }
                    }
                });
            },
        ],function(err, results){ // optional callback         
           //console.log("Session: %j", locals); 
           resolve('DB created');       
        });  
    }); 
};

module.exports = {'populateDB' : new populateDB()};