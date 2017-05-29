create table users (
  id serial not null primary key,
  email text unique,
  username text,
  password text
);

create table proposals (
  id serial not null primary key,
  proposal text,
  user_id integer references users,
  created_at timestamp not null default current_timestamp,
  active boolean not null
);

create table reactions (
  id serial not null primary key,
  approve boolean not null,
  comment text,
  user_id integer references users,
  created_at timestamp not null default current_timestamp,
  proposal_id integer references proposals
);

create table decisions (
  id serial not null primary key,
  user_id integer references users,
  proposal_id integer references proposals,
  created_at timestamp not null default current_timestamp,
  decision text,
  approve boolean not null
);
