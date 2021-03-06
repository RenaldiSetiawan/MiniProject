CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	user_name VARCHAR (20),
	user_email VARCHAR (55),
	user_password VARCHAR (255),
	user_salt VARCHAR (255),
	user_birthdate DATE,
	user_gender VARCHAR (6),
	user_avatar VARCHAR (255),
	user_type VARCHAR (10)
);

CREATE TABLE tours (
	tour_id SERIAL PRIMARY KEY,
	tour_name VARCHAR (100),
	tour_route VARCHAR (100), 
	tour_package VARCHAR (100),
	tour_schedule DATE,
	tour_price NUMERIC,
	tour_hotel VARCHAR (1),
	tour_pesawat VARCHAR (35),
	tour_description VARCHAR (1000),
	tour_user_id INTEGER NOT NULL,
	FOREIGN KEY (tour_user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tours_comments (
	toco_id SERIAL PRIMARY KEY,
	toco_comments VARCHAR (255),
	toco_created_on DATE,
	toco_rating INTEGER,
	toco_tour_id INTEGER NOT NULL,
	toco_user_id INTEGER NOT NULL,
	FOREIGN KEY (toco_tour_id) REFERENCES tours (tour_id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (toco_user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tours_cart (
	toca_id SERIAL PRIMARY KEY,
	toca_created_on DATE,
	toca_status VARCHAR (15),
	toca_user_id INTEGER NOT NULL,
	FOREIGN KEY (toca_user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE tours_images (
	toim_id SERIAL PRIMARY KEY,
	toim_filename VARCHAR (100),
	toim_filesize VARCHAR (100),
	toim_filetype VARCHAR (50),
	toim_primary BOOLEAN,
	toim_tour_id INTEGER NOT NULL,
	FOREIGN KEY (toim_tour_id) REFERENCES tours (tour_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE orders (
	order_name VARCHAR (25) DEFAULT ord_id() PRIMARY KEY,
	order_created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	order_total_children NUMERIC,
	order_discount NUMERIC,
	order_tax NUMERIC,
	order_total_due NUMERIC,
	order_total_qty INTEGER,
	order_payt_trx_number VARCHAR (100),
	order_city VARCHAR (15),
	order_address VARCHAR (500),
	order_status VARCHAR (15),
	order_user_id INTEGER NOT NULL,
	FOREIGN KEY (order_user_id) REFERENCES users (user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE line_items (
	lite_id SERIAL PRIMARY KEY,
	lite_qty INTEGER,
	lite_status VARCHAR (15),
	lite_tour_id INTEGER NOT NULL,
	lite_toca_id INTEGER NOT NULL,
	lite_order_name VARCHAR (25),
	FOREIGN KEY (lite_tour_id) REFERENCES tours (tour_id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (lite_toca_id) REFERENCES tours_cart (toca_id) ON UPDATE CASCADE ON DELETE CASCADE,
	unique (lite_toca_id, lite_tour_id)
);

-- Sequence Number
create sequence seq_ord
increment 1
minvalue 1
maxvalue 9223372036854775807
start 1

create or replace function ord_id () returns varchar as $$
select CONCAT('ORD',to_char(now(),'YYYYMMDD'),'-',lpad(''||nextval('seq_ord'),4,'0'))
$$ language sql