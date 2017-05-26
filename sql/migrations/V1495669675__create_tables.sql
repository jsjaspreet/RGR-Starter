create table users (
  user_id serial not null primary key,
  email text unique,
  username text,
  password text
);

create table proposals (
  proposal_id serial not null primary key,
  proposal text,
  user_id integer references users,
  created_at timestamp not null default current_timestamp,
  active boolean not null
);

create table reactions (
  reaction_id serial not null primary key,
  approve boolean not null,
  comment text,
  user_id integer references users,
  created_at timestamp not null default current_timestamp,
  proposal_id integer references proposals
);

create table decisions (
  decision_id serial not null primary key,
  user_id integer references users,
  proposal_id integer references proposals,
  created_at timestamp not null default current_timestamp,
  decision text,
  approve boolean not null
);
