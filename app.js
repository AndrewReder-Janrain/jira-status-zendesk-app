

	(function() {
	var jiraUrl = '',
	jiraStatus = "No Status",
	jiraComments = [],
	errorMessage ='',
	jiraTicket = '',
	jiraId = '';
	return {
	events: {
		'app.activated':'init'
	},
	init: function() {
		this.getJiraUrl();
	},
	getJiraUrl: function() {
		jiraURL = $('#ember2692').text();
		if (jiraURL.indexOf("https://")<0){
			statusMessage = "No valid JIRA URL";
		}
		else{
			linkJiraTicket();
		}
	},
	linkJiraTicket: function() {
		$.get(jiraURL,function(response) {
				alert( "success" );
				jiraTicket = response;
				parseJiraTicket();
		});
	},
	parseJiraTicket: function() {
		jiraId = result['id'];
		jiraComments = result['fields']['comments'];
		jiraStatus = result['fields']['status']['name'];
		showTemplate();
	},
	showTemplate: function(){
		this.switchTo('hello', {
			jiraUrl: jiraUrl,
			jiraStatus: jiraStatus,
			jiraComments: jiraComments,
			jiraId: jiraId,
			jiraTicket: jiraTicket
		});
	}
};
}());
