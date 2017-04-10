import React, { Component } from 'react'
import { debounce } from 'throttle-debounce';

export default class StarWars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            username: null,
            planetData: { count: 0 },
            error: null,
            authError: null,
            searching: false
        };
    }
    dologin() {
        if (this.refs.username.value === null || this.refs.username.value === "") {
            this.setState({
                error: 'Please enter username'
            });
        } else if (this.refs.password.value === null || this.refs.password.value === "") {
            this.setState({
                error: 'Please enter password'
            });
        } else {
            this.setState({
                error: null
            }, () => {
                const URL = 'https://swapi.co/api/people/?search=' + this.refs.username.value;
                fetch(URL).then((data) => data.json())
                    .then((json) => {
                        if (json.count === 0) {
                            this.setState({
                                authError: 'Username does not exists.'
                            });
                        }
                        json.results.map((val) => {
                            if (val.birth_year === this.refs.password.value) {
                                return this.setState({
                                    login: true,
                                    username: val.name
                                });
                            }
                            this.setState({
                                authError: 'Password did not match'
                            });
                        })
                    });
            });
        }
    }
    doSearch() {
        if (this.state.searching === true) {
            const URL = 'https://swapi.co/api/planets/?search=' + this.refs.searchit.value;
            fetch(URL)
                .then((data) => data.json())
                .then((json) => {
                    this.setState({
                        planetData: json,
                        searching: false
                    });
                    if (json.results.length === 0) {
                        console.log('No data found, search again !');
                    }
                });
        }
    }
    render() {
        if (this.state.login === true) {
            if (this.state.username === 'Luke Skywalker') {
                this.doSearch = debounce(0, this.doSearch);
            } else {
                this.doSearch = debounce(4000, this.doSearch);
            }
        }
        return (
            <div className="container">
                {this.state.login === false ? <div>
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="inputEmail3" className="col-sm-4 control-label">CHARACTER NAME :</label>
                            <div className="col-sm-6">
                                <input ref="username" type="text" className="form-control" placeholder="username" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword3" className="col-sm-4 control-label">DOB :</label>
                            <div className="col-sm-6">
                                <input ref="password" type="password" className="form-control" name="password" id="password" placeholder="Password" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-4 col-sm-6">
                                <button type="submit" onClick={this.dologin.bind(this)} className="btn btn-PRIMARY">Sign in</button>
                            </div>
                        </div>
                    </div>
                    {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                    {this.state.authError && <div className="alert alert-danger">{this.state.authError}</div>}
                </div> : <div>
                        <div className="form-horizontal">
                            <div className="alert alert-success text-center">Welcome <b>{this.state.username}</b> ! <span onClick={() => {
                                this.setState({
                                    login: false,
                                    username: null,
                                    planetData: { count: 0 },
                                    error: null,
                                    authError: null,
                                    searching: false
                                })
                            }}>(click me to logout)</span></div>
                            <div className="form-group">
                                <label htmlFor="SEARCHnOW" className="col-sm-4 control-label">Search Planets : {this.state.searching ? '(Searching)' : null}</label>
                                <div className="col-sm-6">
                                    <input ref="searchit" type="text" className="form-control" placeholder="Search here..." onKeyUp={
                                        () => {
                                            this.setState({ searching: true }, () => this.doSearch());
                                        }
                                    } />
                                </div>
                            </div>
                            {this.state.planetData.count > 0 ? this.state.planetData.results.map((data, key) => {
                                return (
                                    <div key={key} className="alert alert-warning">
                                        {data.name} - (Population : {data.population})
                                    </div>
                                );
                            }) : null}
                        </div>
                    </div>}
            </div>
        );
    }
}
