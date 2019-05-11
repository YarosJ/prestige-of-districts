import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { GET_TARGETS } from '../../queries';
import ErrorMessage from '../../../Error';
import confirmDialog from '../../../../helpers/confirmDialog';
import { childrenPropType } from '../../../../constants/propTypes';

const DELETE_TARGET = gql`
  mutation($URL: String!) {
    removeTarget(URL: $URL) {
      URL
    }
  }
`;

const confirmAndDelete = async (deleteTarget) => {
  await confirmDialog({ action: 'target', onConfirm: deleteTarget });
};

const DeleteTarget = ({
  target, children, style,
}) => (
  <Mutation
    mutation={DELETE_TARGET}
    variables={{ URL: target.URL }}
    update={(cache) => {
      const data = cache.readQuery({ query: GET_TARGETS });

      const updatedTargets = data.targets.filter(targetItem => targetItem.URL !== target.URL);

      cache.writeQuery({
        query: GET_TARGETS,
        data: {
          ...data,
          targets: updatedTargets,
        },
      });
    }}
  >
    {(deleteTarget, { error }) => (
      <div
        role="button"
        tabIndex="-1"
        onClick={() => confirmAndDelete(deleteTarget)}
        onKeyPress={() => confirmAndDelete(deleteTarget)}
        style={style}
      >
        { children }
        { error && <ErrorMessage error={error} /> }
      </div>
    )}
  </Mutation>
);

DeleteTarget.propTypes = {
  target: PropTypes.shape({
    URL: PropTypes.string,
  }),
  children: childrenPropType,
  style: PropTypes.objectOf(PropTypes.any),
};

DeleteTarget.defaultProps = {
  target: null,
  children: null,
  style: {},
};

export default DeleteTarget;
