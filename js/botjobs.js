"use strict";

var Job = React.createClass({
  render: function() {
    return (
        <li className="job">
        <span className="id">Job n°{this.props.job.id_job}</span>
        , <span className="login">{this.props.job.login}</span>
        , <span className="timestamp">{this.props.job.last_event}</span>
        : <span className="comment">{this.props.job.comment_text}</span>
        </li>
    )
  }
});

var JobsList = React.createClass({
  render: function() {
    var jobslist = this.props.jobs.map(function(job, index){
      var key = "" + job.id_job + job.last_event;
      return (
          <Job job={job} key={key} />
      );
    })
    return (
        <ul className="joblist">
        {jobslist}
      </ul>
    )}
});


var InputText =  React.createClass({
   getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return <input type="text" id='formcomment' name="comment" value={value} onChange={this.handleChange} />;
  }
});


var InputFile =  React.createClass({
   getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return (
        <input type="file" id='formfile' accept="text/plain,py" name="file" value={value} onChange={this.handleChange} />
           )
  }
});


var JobInput = React.createClass({
  submit: function(e){
    e.preventDefault();
    // Un peu de jquery, passer à flux ?
    var submission = {file: $('#formfile').val(), comment: $('#formcomment').val()};
    alert(submission.file);
    $.ajax({
      type: "POST",
      url: 'post_job.php',
      data: submission,
      dataType: 'json',
      success: function(data){
        alert(data);
        if (data.id == 'undefined'){
          alert(data);
        }
        else {
          this.clearForm();
        }
      }.bind(this)
    });
  },
  clearForm: function(){
    alert('clear');
    $('#formfile').val('');
    $('#formcomment').val('');
  },
  render: function(){
//        <form action="post_job.php" id="jobInput">
    return (
        <div className="jobInput">
        <form onSubmit={this.submit} id="jobInput">
        <fieldset>
        <legend>Envoyer un job au(x) robot(s)</legend>
        <label>Fichier  <InputFile /></label><br/>
        <label>Description  <InputText /></label>
        </fieldset>
        <input type="submit" className="btn"
        value="Envoyer" />
        </form>
        </div>
    )
  }
});



/* test */
/* source: */
   /* http://stackoverflow.com/questions/21234106/upload-file-using-reactjs-via-blueimp-fileupload-jquery-plugin
*/
var FileUpload = React.createClass({
  handleFile: function(e) {
    var file = e.target.files[0];
    var formData = new FormData();
    console.log('formData');
    formData.append('file',  file, file.name);
    formData.append('comment', this.state.value);
    this.setState(this.getInitialState());
    $.ajax({
      url: 'post_job.php',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data) {
        console.log('success', data);
      },
      error: function() {
        console.error('error uploading file');
      },
    });
  },
  getInitialState: function() {
    return {value: ''};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function() {
    var value = this.state.value;
    return (
        <div>
        <input type="text" id='formcomment' name="comment" value={value} onChange={this.handleChange} />
        <input className="btn btn-default btn-file" type="file" onChange={this.handleFile} accept="*.py"/>
        </div>
    );
  }
});
/* fin test */


var JobsBox = React.createClass({
  loadJobs: function(){
    $.getJSON(this.props.url, {
      dataType: 'json',
      type: 'POST',
    }).done(function(data){this.setState({jobs: data})}.bind(this))
  },
  getInitialState: function() {
    return {jobs: []};
  },
  componentDidMount: function() {
    this.loadJobs();
    setInterval(this.loadJobs, this.props.pollInterval);
  },
  render: function() {
    return (
        <div className="jobbox">
        <FileUpload />
        <JobsList jobs={this.state.jobs} />
        </div>
    )
  }
});

React.render(
  <JobsBox url="get_jobs.php" pollInterval={50000} />,
  document.getElementById('react_content')
);
