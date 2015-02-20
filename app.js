(function() {
		var jiraUrl = '',
		jiraStatus = "No Status",
		jiraComments = [],
		errorMessage ='',
		jiraTicket = 'TP-1',
		jiraId = '',
		statusMessage = '',
		baseUrl = 'http://localhost:2990/jira/rest/api/2/issue/',
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
					/*success: function(data){
						alert(data);
					},
					error: function(req,stat,err){
						alert('JIRA Request Failed')
					},*/
					xhrFields: {
						withCredentials: true
					}
				};
			}
		},
		init: function() {
			this.getJiraUrl();
		},
		getJiraUrl: function() {
			var ticket = this.ticket();
			var testUrl = ticket.customField("custom_field_23054251");
			jiraUrl = baseUrl + jiraTicket;
			alert(testUrl);
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
			jiraId = jiraData['key'];
			jiraAssignee = jiraData['fields']['assignee']['displayName'];
			jiraComments = jiraData['fields']['comment']['comments'];
			jiraStatus = jiraData['fields']['status']['name'];
			jiraUpdated = jiraData['fields']['updated'];
			jiraStatusColor = jiraData['fields']['status']['statusCategory']['colorName'];
			this.showTemplate();
		},
		showTemplate: function(){
			this.switchTo('ticket', {
				jiraStatus: jiraStatus,
				jiraComments: jiraComments,
				jiraId: jiraId,
				jiraAssignee: jiraAssignee,
				jiraUpdated: jiraUpdated,
				jiraStatusColor: jiraStatusColor
			});
		}
	};
}());
