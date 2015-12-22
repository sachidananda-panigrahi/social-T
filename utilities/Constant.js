module.exports = {
    'CONSTANTS': {
        'DOCUMENT_NAMES': {
            'USER': 'users',
            'THRESHOLD_AUDIT': 'ThresholdAudit',
            'THRESHOLD': 'Threshold',
            'ROOMS': 'Rooms',
            'OCCURRENCE_NOTES': 'OccurenceNotes',
            'LAST_RECORD': 'LastRecord',
            'EVENT_LOG': 'EventLog',
            'BEHAVIORS': 'Behaviours',
            'ALERT_LOG': 'AlertLog',
            'SETTINGS': 'Settings'
        },
        //'CSV_FILES_NAMES': ['csv1', 'csv2', 'csv3', 'csv4', 'csv5', 'csv6', 'csv7', 'csv8', 'csv9', 'csv10', 'csv11', 'csv12', 'csv13', 'csv14', 'csv15', 'csv16'],
        'NUMBER_OF_PEOPLE_CONFIDENCE_VALUE' : 0.8,
        'NUMBER_OF_PEOPLE_PRIORITY' : 100,
        'SENSOR_CONNECTED_CSV_INDEX_NAME': 'cameraconnected',
        'HIGH_PRIORITY_BEHAVIOR_THRESHOLD': 5,
        'MINIMUM_CONFIDENCE_THRESHOLD': 0.000,
        'PEOPLE_COUNT_EXCEEDED_BEHAVIOR': 'extra people',
        'PEOPLE_COUNT_LESS_BEHAVIOR': 'people missing',
        'AUDIO_ALERT_LOG_INSERTION_INTERVAL': 3,/* Note: This is in minutes */
        'SENSOR_OFFLINE_TIME_THRESHOLD': 20,
		'VMS_SERVER_IP':'192.168.12.168',
		'VMS_ENGINE_NAME':'localhost',
		'VMS_SERVER_USERNAME':'test',
		'VMS_SERVER_PWD':'test',
		'VIDEO_EXPORT_PATH': 'c://temp',
        'CSV_PATH':__dirname + '/../csv',
        //'CSV_PATH': '_http://192.168.14.12:8080/project/dir/csv',
        'DATE_CSV_INDEX_NAME': 'dd-mm-yyyy',
        'TIME_CSV_INDEX_NAME': 'HH:MM:SS.FFF',
        'CSV_THRESHOLD_FILE_SIZE': 1000000,//100000,
        'SESSION_TIMEOUT': 3600000, /* Note: This is in milliseconds */
		'POPUPS_TO_BE_OPENED':5
    }
};