(function() {
		var jiraUrl = '',
		jiraStatus = "No Status",
		jiraComments = [],
		errorMessage ='',
		jiraTicket = 'JANRAIN-2386',
		jiraId = '',
		statusMessage = '',
		baseUrl = 'http://127.0.0.1:8000/jira_status/jira_status/',
		jiraData = '',
		jiraAssignee = '',
		jiraUpdated ='',
		jiraStatusColor ='';

	return {
		events: {
			'app.activated':'init'
		},
		requests: {
			jiraRequest: function(url){
				return {
					url: url,
					type: 'GET',
					cors: true,
					dataType: 'json',
					data: { ticket: jiraTicket },
				};
			}
		},
		init: function() {
			this.getJiraUrl();
		},
		getJiraUrl: function() {
			var ticket = this.ticket();
			var testUrl = ticket.customField("custom_field_23054251");
			jiraUrl = baseUrl;
			if (testUrl.indexOf("https://janrain")<0){
				statusMessage = "No valid JIRA URL";
				this.switchTo('error', {
					statusMessage: statusMessage
				});
			}
			else{
				this.linkJiraTicket();

			}
		},
		linkJiraTicket: function() {
			this.ajax('jiraRequest',jiraUrl).done(function(data){
				jiraData = data;
				this.parseJiraTicket();
			});
			
		},
		parseJiraTicket: function() {
			jiraDescription = jiraData['summary'];
			/*jiraAssignee = jiraData['fields']['assignee']['displayName'];
			jiraComments = jiraData['fields']['comment']['comments'];
			jiraStatus = jiraData['fields']['status']['name'];
			jiraUpdated = jiraData['fields']['updated'];
			jiraStatusColor = jiraData['fields']['status']['statusCategory']['colorName'];*/
			this.showTemplate();
		},
		showTemplate: function(){
			this.switchTo('ticket', {
				jiraDescription: jiraDescription
				/*jiraStatus: jiraStatus,
				jiraComments: jiraComments,
				jiraId: jiraId,
				jiraAssignee: jiraAssignee,
				jiraUpdated: jiraUpdated,
				jiraStatusColor: jiraStatusColor*/
			});
		}
	};
}());
