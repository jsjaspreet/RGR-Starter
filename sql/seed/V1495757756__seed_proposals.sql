insert into proposals (
  proposal,
  user_id,
  active
)
values
(
  'Use GraphQL instead of REST',
  1,
  true
),
(
  'Use Apollo instead of Relay',
  2,
  true
),
(
  'Use React instead of Vue.js',
  1,
  true
);

insert into reactions (
  approve,
  comment,
  user_id,
  proposal_id
) values
(
  true,
  'GraphQL > REST',
  2,
  1
),
(
  false,
  'Relay has more support than Apollo',
  1,
  2
),
(
  false,
  'Vue.JS is more hype than React',
  2,
  3
);

insert into decisions (
  user_id,
  proposal_id,
  decision,
  approve
) values
(
  1,
  1,
  'Approved this proposal',
  true
),
(
  2,
  2,
  'Declined this proposal',
  false
),
(
  1,
  3,
  'Approved',
  true
);

