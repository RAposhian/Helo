create table people (
    people_id serial primary key,
    username varchar(30),
    password varchar(300),
    profile_pic varchar(8000)
);

create table posts (
    post_id serial primary key,
    title varchar(50),
    img varchar(8000),
    content varchar(8000),
    author_id int references people(people_id)
);

insert into people (
    username,
    password,
    profile_pic
) values 
(
    'Ryan', 'test', 'image.jpg'
),
(
    'steve', 'test', 'image.jpg'
),
(
    'bob', 'test', 'image.png'
);

insert into posts (
    title,
    img,
    content,
    author_id
) values 
(
    'test', 'test image', 'testest', 1
),
(
    'test2', 'test image', 'testest', 2
);