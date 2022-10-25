-- drop database if exists college_commerce; 
-- create database college_commerce; 
use college_commerce;
-- import data table wizard csv file, named imports
-- drop table if exists college_info; 
create table college_info(
	`name` varchar(150) not null, 
    address varchar(150) not null 
); 
insert into college_info(`name`, address)
select distinct LocationName, Address from imports; 
select * from college_info; 
