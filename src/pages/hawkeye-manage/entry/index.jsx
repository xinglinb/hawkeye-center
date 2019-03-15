import React from 'react';
import { connect } from 'dva';

import './index.scss';

import app from '../app';
import entryModel from './models/entry';

app.model(entryModel);

@connect(({ entry }) => ({ entry }))
export default class Entry extends React.PureComponent {
  render() {
    const { entry } = this.props;
    const {
      uiData: {
        isGlobalLoading,

      },
    } = entry;

    return (
      <div>
        111
      </div>
    );
  }
}

