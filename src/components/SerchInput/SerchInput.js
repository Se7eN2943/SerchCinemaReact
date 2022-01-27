import React, { Component } from 'react';
import { Input } from 'antd';



<Input autoFocus
    placeholder="Search"
    type="text" value={this.state.value}
    onKeyUp={this.debounce(this.serchMovie, 1000)}
    onChange={this.onSubmit} />
