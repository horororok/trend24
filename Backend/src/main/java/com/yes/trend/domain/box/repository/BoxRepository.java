package com.yes.trend.domain.box.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yes.trend.domain.admin.entity.Admin;
import com.yes.trend.domain.book.entity.Book;
import com.yes.trend.domain.box.entity.Box;

public interface BoxRepository extends JpaRepository<Box, Integer> {
	boolean existsByNameAndAdmin(String name, Admin admin);

	@Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END " +
		"FROM Box b " +
		"JOIN b.boxBooks bb " +
		"JOIN bb.book bk " +
		"WHERE b.id = :boxId " +
		"AND b.admin.id = :adminId " +
		"AND bk.id = :bookId")
	boolean existsByBoxIdAndAdminIdAndBookId(@Param("boxId") Integer boxId,
		@Param("adminId") Integer adminId,
		@Param("bookId") Integer bookId);

	@Query("SELECT bk " +
		"FROM Box b " +
		"JOIN b.boxBooks bb " +
		"JOIN bb.book bk " +
		"WHERE b.id = :boxId")
	List<Book> findBooksByBoxId(@Param("boxId") Integer boxId);

	List<Box> findByAdmin_Id(Integer adminPkId);
}
