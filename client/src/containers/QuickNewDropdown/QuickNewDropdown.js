import React from 'react';
import ListSelect from 'components/ListSelect';
import { FormattedMessage as T } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Icon } from 'components';
import { Position } from '@blueprintjs/core';
import quickNewOptions from 'common/quickNewOptions';

/**
 * Quick New Dropdown.
 */
function QuickNewDropdown() {
  const history = useHistory();

  const handleClickQuickNew = ({ id }) => {
    history.push(`/${id}`);
  };

  return (
    <ListSelect
      items={quickNewOptions}
      onItemSelect={(type) => handleClickQuickNew(type)}
      textProp={'name'}
      filterable={false}
      popoverProps={{ minimal: false, position: Position.BOTTOM }}
      defaultText={'Select'}
      buttonProps={{
        text: <T id={'quick_new'} />,
        icon: <Icon icon={'plus-24'} iconSize={20} />,
        minimal: true,
      }}
      className={'form-group-quick-new-downDrop'}
    />
  );
}

export default QuickNewDropdown;