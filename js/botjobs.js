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
    /* Un peu de jquery, passer à flux ? */
    var submission = {file: $('#formfile').val(), comment: $('#formcomment').val()};
    $.ajax({
      type: "POST",
      url: 'post_job.php',
      data: submission,
      dataType: 'json',
      success: function(data){
        if (data.ok != 'ok'){alert(data)}
      }
    });
  },
  render: function(){
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
        <JobInput />
        <JobsList jobs={this.state.jobs} />
        </div>
    )
  }
});

React.render(
  <JobsBox url="get_jobs.php" pollInterval={50000} />,
  document.getElementById('react_content')
);
