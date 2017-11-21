$.indexWindowNav.open();
$.indexWindowNav.openWindow($.indexWindow);

var TAG = '[index]';
var plot = require('com.plotprojects.ti');

function onOpen(viewParams) {
	console.info('App ready');
	$.button1.addEventListener('click', onButton1Action);
	$.button2.addEventListener('click', onButton2Action);

	plot.addEventListener("plotNotificationReceived", onPlotNotification);

	// Comment toggle to activate/deactivate pushwoosh
	initPush();
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
		"application": 'your_pushwoosh_appid',
		"gcm_project": 'your_gcm_project_id'
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

onOpen();