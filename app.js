

(function() {
		var jiraUrl = '',
		jiraStatus = "No Status",
		jiraComments = [],
		errorMessage ='',
		jiraTicket = 'TP-1',
		jiraId = '',
		statusMessage = '',
		baseUrl = 'http://localhost:2990/jira/rest/api/2/issue/',
		jiraData = '';
	return {
	events: {
		'app.activated':'init'
	},
	requests: {
		jiraRequest: {
			url: jiraUrl,
			type: 'GET',
			cors: true,
			dataType: 'json',
			success: function(result){
				alert(result);
				jiraData = JSON.stringify(result);
			},
			error: function(req,stat,err){
				alert(JSON.stringify(req));
				alert(stat);
				alert(err);
			}/*,
			xhrFields: {
				withCredentials: true
			}*/
		}
	},
	init: function() {
		this.getJiraUrl();
	},
	getJiraUrl: function() {
		jiraUrl = baseUrl + jiraTicket;
		//jiraUrl = $('#ember2692').text();
		alert(jiraUrl);
		//if (jiraUrl.indexOf("http://")<0){
		//	statusMessage = "No valid JIRA URL";
		//}
		//else{
			this.linkJiraTicket();
		//}
	},
	linkJiraTicket: function() {
		alert('Entered linkJiraTicket');
		this.$.ajax('jiraRequest');
		//alert(jiraData);

	},
	parseJiraTicket: function() {
		alert('Entered parseJiraTicket');
		//jiraId = jiraData['id'];
		//jiraComments = jiraData['fields']['comments'];
		//jiraStatus = jiraData['fields']['status']['name'];
		this.showTemplate();
	},
	showTemplate: function(){
		alert('Entered showTemplate');
		this.switchTo('layout', {
			jiraUrl: jiraUrl,
			jiraStatus: jiraStatus,
			jiraComments: jiraComments,
			jiraId: jiraId,
			jiraTicket: jiraTicket
		});
	}
};
}());
