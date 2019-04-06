import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_TARGETS } from '../constants/queries';

const DELETE_TARGET = gql`
  mutation($id: ID!) {
    deleteTarget(id: $id)
  }
`;

const Delete = ({
  target, limit, cursor, children, style,
}) => (
  <Mutation
    mutation={DELETE_TARGET}
    variables={{ id: target.id }}
    update={(cache) => {
      const data = cache.readQuery({
        query: GET_TARGETS,
        variables: { limit, cursor },
      });

      const updatedTargets = data.targets.filter(targetItem => targetItem.id !== target.id);

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

export default Delete;
