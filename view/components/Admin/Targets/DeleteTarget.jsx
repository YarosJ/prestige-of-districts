import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_TARGETS } from '../constants/queries';
import ErrorMessage from '../../Error';
import confirmDialog from '../../../helpers/confirmDialog';

const DELETE_TARGET = gql`
  mutation($URL: String!) {
    removeTarget(URL: $URL) {
      URL
    }
  }
`;

const DeleteTarget = ({
  target, limit, cursor, children, style,
}) => (
  <Mutation
    mutation={DELETE_TARGET}
    variables={{ URL: target.URL }}
    update={(cache) => {
      const data = cache.readQuery({
        query: GET_TARGETS,
        variables: { limit, cursor },
      });

      const updatedTargets = data.targets.filter(targetItem => targetItem.URL !== target.URL);

      cache.writeQuery({
        query: GET_TARGETS,
        variables: { limit, cursor },
        data: {
          ...data,
          targets: updatedTargets,
        },
      });
    }}
  >
    {(deleteTarget, { error }) => (
      <div
        onClick={async () => {
          await confirmDialog({ action: 'target', onConfirm: deleteTarget });
        }}
        style={style}
      >
        { children }
        { error && <ErrorMessage error={error} /> }
      </div>
    )}
  </Mutation>
);

export default DeleteTarget;
