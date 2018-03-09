import { postRepos } from './post';

export const eval = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(postRepos.get(/*TODO*/)(event.body)),
  });
};