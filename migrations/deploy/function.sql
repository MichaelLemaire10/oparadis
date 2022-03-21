-- Deploy oparadis:function to pg
BEGIN;
-- function sql for create
create
or replace function add_customer(json) returns customer as $ $
insert into
  "customer" (
    email,
    password,
    firstname,
    lastname,
    pseudo,
    phone_number,
    avatar
  )
values
  (
    $ 1 ->> 'email',
    $ 1 ->> 'password',
    $ 1 ->> 'firstname',
    $ 1 ->> 'lastname',
    $ 1 ->> 'pseudo',
    $ 1 ->> 'phone_number',
    $ 1 ->> 'avatar'
  ) returning *;
$ $ language sql strict;
-- function sql for update
  create
  or replace function update_customer(json) returns customer as $ $
update
  "customer"
set
  email = $ 1 ->> 'email',
  firstname = $ 1 ->> 'firstname',
  lastname = $ 1 ->> 'lastname',
  pseudo = $ 1 ->> 'pseudo',
  phone_number = $ 1 ->> 'phone_number',
  avatar = $ 1 ->> 'avatar'
where
  id = ($ 1 ->> 'id') :: int returning *;
$ $ language sql strict;
create
  or replace function update_isAdmin(json) returns customer as $ $
update
  "customer"
set
  isAdmin = ($ 1 ->> 'isAdmin') :: boolean
where
  id = ($ 1 ->> 'id') :: int returning *;
$ $ language sql strict;
create
  or replace function update_password(json) returns customer as $ $
update
  "customer"
set
  password = $ 1 ->> 'password'
where
  id = ($ 1 ->> 'id') :: int returning customer;
$ $ language sql strict;
create
  or replace function add_animal(json) returns animal as $ $
insert into
  "animal"(
    "type",
    race,
    diseases,
    notes,
    photo,
    customer_id
  )
values
  (
    $ 1 ->> 'type',
    $ 1 ->> 'race',
    $ 1 ->> 'diseases',
    $ 1 ->> 'notes',
    $ 1 ->> 'photo',
    ($ 1 ->> 'customer_id') :: int
  ) returning *;
$ $ language sql strict;
create
  or replace function update_animal(json) returns animal as $ $
update
  "animal"
set
  "type" = $ 1 ->> 'type',
  race = $ 1 ->> 'race',
  diseases = $ 1 ->> 'diseases',
  notes = $ 1 ->> 'notes',
  photo = $ 1 ->> 'photo',
  customer_id = ($ 1 ->> 'customer_id') :: int
where
  id = ($ 1 ->> 'id') :: int returning *;
$ $ language sql strict;
create
  or replace function add_house(json) returns house as $ $
insert into
  "house"(
    address,
    zip_code,
    city,
    country,
    "type",
    title,
    nb_rooms,
    nb_bedrooms,
    surface,
    area,
    "floor",
    description,
    latitude,
    longitude,
    map,
    internet,
    washing_machine,
    TV,
    hoven,
    microwave,
    dishwasher,
    bathtub,
    shower,
    parking,
    customer_id
  )
values
  (
    $ 1 ->> 'address',
    $ 1 ->> 'zip_code',
    $ 1 ->> 'city',
    ($ 1 ->> 'country') :: int,
    ($ 1 ->> 'type') :: int,
    $ 1 ->> 'title',
    ($ 1 ->> 'nb_rooms') :: int,
    ($ 1 ->> 'nb_bedrooms') :: int,
    ($ 1 ->> 'surface') :: int,
    ($ 1 ->> 'area') :: int,
    ($ 1 ->> 'floor') :: int,
    $ 1 ->> 'description',
    $ 1 ->> 'latitude',
    $ 1 ->> 'longitude',
    $ 1 ->> 'map',
    ($ 1 ->> 'internet') :: BOOLEAN,
    ($ 1 ->> 'washing_machine') :: BOOLEAN,
    ($ 1 ->> 'TV') :: BOOLEAN,
    ($ 1 ->> 'hoven') :: BOOLEAN,
    ($ 1 ->> 'microwave') :: BOOLEAN,
    ($ 1 ->> 'dishwasher') :: BOOLEAN,
    ($ 1 ->> 'bathtub') :: BOOLEAN,
    ($ 1 ->> 'shower') :: BOOLEAN,
    ($ 1 ->> 'parking') :: BOOLEAN,
    ($ 1 ->> 'customer_id') :: int
  ) returning *;
$ $ language sql strict;
create
  or replace function update_house(json) returns house as $ $
update
  "house"
set
  address = $ 1 ->> 'address',
  zip_code = $ 1 ->> 'zip_code',
  city = $ 1 ->> 'city',
  country = ($ 1 ->> 'country') :: int,
  "type" = ($ 1 ->> 'type') :: int,
  title = $ 1 ->> 'title',
  nb_rooms = ($ 1 ->> 'nb_rooms') :: int,
  nb_bedrooms = ($ 1 ->> 'nb_bedrooms') :: int,
  surface = ($ 1 ->> 'surface') :: int,
  area = ($ 1 ->> 'area') :: int,
  "floor" = ($ 1 ->> 'floor') :: int,
  description = $ 1 ->> 'description',
  latitude = $ 1 ->> 'latitude',
  longitude = $ 1 ->> 'longitude',
  map = $ 1 ->> 'map',
  internet = ($ 1 ->> 'internet') :: BOOLEAN,
  washing_machine = ($ 1 ->> 'washing_machine') :: BOOLEAN,
  TV = ($ 1 ->> 'TV') :: BOOLEAN,
  hoven = ($ 1 ->> 'hoven') :: BOOLEAN,
  microwave = ($ 1 ->> 'microwave') :: BOOLEAN,
  dishwasher = ($ 1 ->> 'dishwasher') :: BOOLEAN,
  bathtub = ($ 1 ->> 'bathtub') :: BOOLEAN,
  shower = ($ 1 ->> 'shower') :: BOOLEAN,
  parking = ($ 1 ->> 'parking') :: BOOLEAN,
  customer_id = ($ 1 ->> 'customer_id') :: int
where
  id = ($ 1 ->> 'id') :: int returning *;
$ $ language sql strict;
create
  or replace function add_photo(json) returns photo as $ $
insert into
  "photo"(photo, customer_id)
values
  ($ 1 ->> 'photo',($ 1 ->> 'customer_id') :: int) returning *;
$ $ language sql strict;
create
  or replace function update_photo(json) returns photo as $ $
update
  "photo"
set
  photo = $ 1 ->> 'photo',
  customer_id = ($ 1 ->> 'customer_id') :: int
where
  id = ($ 1 ->> 'id') :: int returning *;
$ $ language sql strict;
create
  or replace function add_absentee(json) returns absentee as $ $
insert into
  "absentee"(starting_date, ending_date, customer_id)
values
  (
    ($ 1 ->> 'starting_date') :: date,
    ($ 1 ->> 'ending_date') :: date,
    ($ 1 ->> 'customer_id') :: int
  ) returning *;
$ $ language sql strict;
create
  or replace function update_absentee(json) returns absentee as $ $
update
  "absentee"
set
  starting_date = ($ 1 ->> 'starting_date') :: date,
  ending_date = ($ 1 ->> 'ending_date') :: date,
  customer_id = ($ 1 ->> 'customer_id') :: int,
  house_sitter = ($ 1 ->> 'house_sitter') :: int
where
  id = ($ 1 ->> 'id') :: int returning *;
$ $ language sql strict;
create
  or replace function add_plant(json) returns plant as $ $
insert into
  "plant"("type", notes, photo, customer_id)
values
  (
    $ 1 ->> 'type',
    $ 1 ->> 'notes',
    $ 1 ->> 'photo',
    ($ 1 ->> 'customer_id') :: int
  ) returning *;
$ $ language sql strict;
create
  or replace function update_plant(json) returns plant as $ $
update
  "plant"
set
  "type" = $ 1 ->> 'type',
  notes = $ 1 ->> 'notes',
  photo = $ 1 ->> 'photo',
  customer_id = ($ 1 ->> 'customer_id') :: int
where
  id = ($ 1 ->> 'id') :: int returning *;
$ $ language sql strict;
create
  or replace function add_type(json) returns house_type as $ $
insert into
  "house_type"(type)
values
  ($ 1 ->> 'type') returning *;
$ $ language sql strict;
create
  or replace function update_type(json) returns house_type as $ $
update
  "house_type"
set
  type = $ 1 ->> 'type'
where
  id = ($ 1 ->> 'id') :: int returning *;
$ $ language sql strict;
COMMIT;