import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_TARGETS } from '../constants/queries';

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
    {(deleteTarget, { loading, error }) => (
      <div onClick={deleteTarget} style={style}>
        {children}
      </div>
    )}
  </Mutation>
);

export default DeleteTarget;
