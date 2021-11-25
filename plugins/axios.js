import repository, { $axios } from '~/repository/baseRepo'

export default function(ctx, inject) {
  if (!ctx.$axios) {
    console.error( 'Please make sure $axios module is added');
  } else {
    const repo = repository(ctx.$axios)
    inject('repo', repo)
  }
}
