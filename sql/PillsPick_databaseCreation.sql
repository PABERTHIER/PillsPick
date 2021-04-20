CREATE TABLE Customer (
  id INT IDENTITY PRIMARY KEY NOT NULL,
  name NVARCHAR(255) NOT NULL,
  last_name NVARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  address NVARCHAR(255) DEFAULT NULL,
  zip_code NVARCHAR(255) DEFAULT NULL,
  city NVARCHAR(255) DEFAULT NULL,
  ss_number INT NOT NULL,
  mail NVARCHAR(255) NOT NULL,
  phone_number NVARCHAR(255) NOT NULL,
  password NVARCHAR(255) NOT NULL
)

-- --------------------------------------------------------


--
-- Table structure for table picture
--

CREATE TABLE Picture (
  id INT IDENTITY PRIMARY KEY NOT NULL,
  datas VARBINARY(MAX) NOT NULL,
  alt NVARCHAR(255) NOT NULL
)

-- --------------------------------------------------------


--
-- Table structure for table drug
--

CREATE TABLE Drug (
  id INT IDENTITY PRIMARY KEY NOT NULL,
  name NVARCHAR(255) DEFAULT NULL,
  type NVARCHAR(255) DEFAULT NULL,
  instructions NVARCHAR(MAX) NOT NULL,
  picture_id INT REFERENCES Picture(id),
  cis_code INT DEFAULT NULL,
  route_administration NVARCHAR(255) NOT NULL,
  owner NVARCHAR(255) NOT NULL,
  is_watched INT NOT NULL,
  header_name NVARCHAR(255) NOT NULL
)

-- --------------------------------------------------------



--
-- Table structure for table DrugStore
--

CREATE TABLE DrugStore (
  id INT IDENTITY PRIMARY KEY NOT NULL,
  url NVARCHAR(255) NOT NULL,
  name NVARCHAR(255) NOT NULL,
  holders_name NVARCHAR(255) NOT NULL,
  address NVARCHAR(255) DEFAULT NULL,
  department NVARCHAR(255) DEFAULT NULL,
  area NVARCHAR(255) DEFAULT NULL,
  zip_code NVARCHAR(255) DEFAULT NULL,
  city NVARCHAR(255) DEFAULT NULL
)

-- --------------------------------------------------------


--
-- Table structure for table orders
--

CREATE TABLE Orders (
  id INT IDENTITY PRIMARY KEY NOT NULL,
  id_customer INT REFERENCES Customer(id) NOT NULL,
  id_drugStore INT REFERENCES DrugStore(id) NOT NULL,
  date date NOT NULL
)

-- --------------------------------------------------------

--
-- Table structure for table spec_drug
--

CREATE TABLE Spec_drug (
  id INT IDENTITY PRIMARY KEY NOT NULL,
  drugStore_id INT REFERENCES DrugStore(id) NOT NULL,
  drug_id INT REFERENCES Drug(id) NOT NULL,
  quantity INT DEFAULT NULL,
  price DECIMAL(6,2) DEFAULT NULL
)



--
-- Table structure for table orders_content
--

CREATE TABLE Orders_content (
  id_orders INT FOREIGN KEY REFERENCES Orders(id) NOT NULL,
  id_spec_drug INT FOREIGN KEY REFERENCES Spec_drug(id) NOT NULL,
  PRIMARY KEY(id_orders, id_spec_drug)
)

-- --------------------------------------------------------

--
-- Table structure for table Chemist
--

CREATE TABLE Chemist (
  id INT IDENTITY PRIMARY KEY NOT NULL,
  name NVARCHAR(255) NOT NULL,
  last_name NVARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  address NVARCHAR(255) DEFAULT NULL,
  zip_code NVARCHAR(255) DEFAULT NULL,
  city NVARCHAR(255) DEFAULT NULL,
  id_number INT NOT NULL,
  drugStore_id INT REFERENCES DrugStore(id) NOT NULL,
  mail NVARCHAR(255) NOT NULL,
  phone_number NVARCHAR(255) NOT NULL,
  password NVARCHAR(30) NOT NULL
)

-- --------------------------------------------------------

