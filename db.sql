USE [master]
GO
/****** Object:  Database [SQL knihovna]    Script Date: 25.04.2023 12:56:34 ******/
CREATE DATABASE [SQL knihovna]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SQL knihovna_Data', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\SQL knihovna.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'SQL knihovna_Log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\SQL knihovna.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [SQL knihovna] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SQL knihovna].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SQL knihovna] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SQL knihovna] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SQL knihovna] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SQL knihovna] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SQL knihovna] SET ARITHABORT OFF 
GO
ALTER DATABASE [SQL knihovna] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SQL knihovna] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SQL knihovna] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SQL knihovna] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SQL knihovna] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SQL knihovna] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SQL knihovna] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SQL knihovna] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SQL knihovna] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SQL knihovna] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SQL knihovna] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SQL knihovna] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SQL knihovna] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SQL knihovna] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SQL knihovna] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SQL knihovna] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SQL knihovna] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SQL knihovna] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SQL knihovna] SET  MULTI_USER 
GO
ALTER DATABASE [SQL knihovna] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SQL knihovna] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SQL knihovna] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SQL knihovna] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SQL knihovna] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SQL knihovna] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SQL knihovna] SET QUERY_STORE = OFF
GO
USE [SQL knihovna]
GO
/****** Object:  Table [dbo].[Author]    Script Date: 25.04.2023 12:56:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Author](
	[IDAuthor] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Surname] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Author] PRIMARY KEY CLUSTERED 
(
	[IDAuthor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Book_Author]    Script Date: 25.04.2023 12:56:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Book_Author](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[IDBooks] [bigint] NOT NULL,
	[IDAuthor] [bigint] NOT NULL,
 CONSTRAINT [PK_Book_Author] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BookLoan]    Script Date: 25.04.2023 12:56:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BookLoan](
	[IDBookLoan] [bigint] IDENTITY(1,1) NOT NULL,
	[IDCustomer] [bigint] NOT NULL,
	[IDBooks] [bigint] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[Date] [smalldatetime] NOT NULL,
 CONSTRAINT [PK_BookLoan] PRIMARY KEY CLUSTERED 
(
	[IDBookLoan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Books]    Script Date: 25.04.2023 12:56:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[IDBooks] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](200) NOT NULL,
	[ISBN] [char](13) NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_Books] PRIMARY KEY CLUSTERED 
(
	[IDBooks] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 25.04.2023 12:56:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[IDCustomer] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Surname] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[IDCustomer] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Book_Author]  WITH CHECK ADD  CONSTRAINT [FK_IDAuthor] FOREIGN KEY([IDAuthor])
REFERENCES [dbo].[Author] ([IDAuthor])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Book_Author] CHECK CONSTRAINT [FK_IDAuthor]
GO
ALTER TABLE [dbo].[Book_Author]  WITH CHECK ADD  CONSTRAINT [FK_IDBooks] FOREIGN KEY([IDBooks])
REFERENCES [dbo].[Books] ([IDBooks])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Book_Author] CHECK CONSTRAINT [FK_IDBooks]
GO
ALTER TABLE [dbo].[BookLoan]  WITH CHECK ADD  CONSTRAINT [FK_IDBooks1] FOREIGN KEY([IDBooks])
REFERENCES [dbo].[Books] ([IDBooks])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BookLoan] CHECK CONSTRAINT [FK_IDBooks1]
GO
ALTER TABLE [dbo].[BookLoan]  WITH CHECK ADD  CONSTRAINT [FK_IDCustomer] FOREIGN KEY([IDCustomer])
REFERENCES [dbo].[Customer] ([IDCustomer])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[BookLoan] CHECK CONSTRAINT [FK_IDCustomer]
GO
USE [master]
GO
ALTER DATABASE [SQL knihovna] SET  READ_WRITE 
GO
