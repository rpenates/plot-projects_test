$.indexWindow.open();
// $.indexWindowNav.openWindow($.indexWindow);

var TAG = '[index]';
var plot = require('com.plotprojects.ti');
// Comment toggle to activate/deactivate oneSignal module
// var oneSignal = require('com.williamrijksen.onesignal');

function onOpen(viewParams) {
	console.info('App ready');
	$.button1.addEventListener('click', onButton1Action);
	$.button2.addEventListener('click', onButton2Action);

	plot.addEventListener("plotNotificationReceived", onPlotNotification);

	// Comment toggle to activate/deactivate pushwoosh - oneSignal module
	initPush();
	// oneSignalInit();
}

function onButton1Action(btn1Params) {
	console.info(TAG, 'Button 1 - Dummy');
}

function onButton2Action(btn2Params) {
	console.info(TAG, 'Button 2 - Dummy');
}

function onPlotNotification(notifyData) {
	console.info(TAG, 'onPlotNotification: ' + JSON.stringify(notifyData));
}

function onPushEvent(notifyData) {
	console.info(TAG, 'onPushEvent: ' + JSON.stringify(notifyData));
}

function initPush() {
	var pw = require('com.pushwoosh.module');

	pw.initialize({
		"application": '434D3-85A80',
		"gcm_project": '836614956402'
	});

	pw.registerForPushNotifications(function (e) {
		setTimeout(function () {
			console.info(TAG, 'registerForPushNotifications: ' + JSON.stringify(e));
		}, 0);
	}, function (e) {
		setTimeout(function () {
			console.error(TAG, 'registerForPushNotifications: ' + JSON.stringify(e));
		}, 0);
	});

	pw.onPushOpened(onPushEvent);
	pw.onPushReceived(onPushEvent);
}

function oneSignalInit() {

	oneSignal.promptForPushNotificationsWithUserResponse(function (obj) {
		console.info(TAG, 'oneSignalPromtp: ' + JSON.stringify(obj));
	});

	oneSignal.addEventListener('notificationReceived', onPushEvent);

	oneSignal.addEventListener('notificationOpened', onPushEvent);
}

onOpen();