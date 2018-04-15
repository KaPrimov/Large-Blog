package com.kalin.large.core.helpers.datetime;

import java.time.*;
import java.util.Calendar;
import java.util.Date;

/**
 * Extranet Date Utility Helper
 */
public class LargeDateUtil {
	private LargeDateUtil() {}
	private static final String BULGARIAN_DATE_FORMAT = "dd.MM.yyyy";
	private static final String FRENCH_DATE_FORMAT = "dd/MM/yyyy";
	
	/**
	 * Get a YEAR of specific {@link Date}
	 */
	public static int getYearFrom(final Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return LargeDateUtil.getYearFrom(calendar);
	}
	
	/**
	 * Get a YEAR of specific {@link Calendar}
	 */
	public static int getYearFrom(final Calendar calendar) {
		return calendar.get(Calendar.YEAR);
	}
	
	/**
	 * Get a MONTH of specific {@link Date}</br>
	 * Field number for get and set indicating the month. This is a calendar-specific value. The first month of the year in the Gregorian and Julian calendars is JANUARY which is 0; the last depends on the number of months in a year.
	 */
	public static int getMonthFrom(final Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return getMonthFrom(calendar);
	}
	
	/**
	 * Get specific date of month. The first day of the month has value
	 * @param date
	 * @return
	 */
	public static int getDayOfMonth(final Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return getDayOfMonth(calendar);
	}
	
	/**
	 * Get specific date of month. The first day of the month has value 
	 * @param date
	 * @return
	 */
	public static int getDayOfMonth(final Calendar date) {
		return date.get(Calendar.DAY_OF_MONTH);
	}
	
	/**
	 * Get a MONTH of specific {@link Calendar} </br>
	 * Field number for get and set indicating the month. This is a calendar-specific value. The first month of the year in the Gregorian and Julian calendars is JANUARY which is 0; the last depends on the number of months in a year.
	 */
	public static int getMonthFrom(final Calendar calendar) {
		return calendar.get(Calendar.MONTH);
	}
	
	/**
	 * Gets the difference in days between two dates in Calendar format
	 * 
	 * @return the difference in unwrapped {@link Integer}
	 */
	public static final int differenceInDays(final Date date1,final Date date2) {
		return Math.abs(Period.between(LargeDateUtil.convertToLocalDate(date1), LargeDateUtil.convertToLocalDate(date2)).getDays());
	}

	/**
	 * Gets the day that is last in the current month
	 * 
	 * @return {@link Calendar} the final day of the current month
	 */
	public static final Calendar getEndOfMonth(final Date date) {
		Calendar calendar = Calendar.getInstance();
		
		if (date != null) {
			calendar.setTime(date);
		}
		
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
				
		return calculateAbsoluteEndOfTheDay(calendar);
	}

	/**
	 * Gets the day that is first in the current month set to midnight
	 * 
	 * @return {@link Calendar} the first day of the current month
	 */
	public static final Calendar getBeginningOfMonth(final Date date) {
		Calendar calendar = Calendar.getInstance();
		if (date != null) {
			calendar.setTime(date);
		}
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		return calculateMidnight(calendar);
	}
	
	/**
	 * Gets the {@link Calendar} date that was a day ago
	 * @return {@link Calendar} yesterday
	 */
	public static final Calendar getCalendarForYesterday() {
	    Calendar cal = Calendar.getInstance();
	    cal.add(Calendar.DATE, -1);
	    return cal;
	}
	
	/**
	 * Method to set a date to midnight
	 * @param date
	 * @return a date set to its midnight
	 */
	public static final Calendar calculateMidnight(final Calendar date) {
		date.set(Calendar.HOUR_OF_DAY, 0);
		date.set(Calendar.MINUTE, 0);
		date.set(Calendar.SECOND, 0);
		date.set(Calendar.MILLISECOND, 0);
		return date;
	}
	
	/**
	 * Calculate absolute maximum of the date at 23 hour 59 minutes, 59 seconds 999 milliseconds
	 * @param date
	 * @return
	 */
	public static final Calendar calculateAbsoluteEndOfTheDay(final Calendar date) {
		date.set(Calendar.HOUR,  date.getActualMaximum(Calendar.HOUR));
		date.set(Calendar.MINUTE, date.getActualMaximum(Calendar.MINUTE));
		date.set(Calendar.SECOND, date.getActualMaximum(Calendar.SECOND));
		date.set(Calendar.MILLISECOND, date.getActualMaximum(Calendar.MILLISECOND));
		
		return date;
	}
	
	/**
	 * generate the end date of the supplied year
	 * 
	 * @param year
	 * @return {@link Calendar} endDate
	 */
	public static final Calendar generateEndDateByYear(final int year) {
		
		Calendar endDate = Calendar.getInstance();
		endDate.set(Calendar.YEAR, year );
		endDate.set(Calendar.DAY_OF_YEAR, endDate.getActualMaximum(Calendar.DAY_OF_YEAR));	
		
		return calculateAbsoluteEndOfTheDay(endDate);
	}

	/**
	 * generate the start date of the supplied year
	 * 
	 * @param year
	 * @return {@link Calendar} startDate
	 */
	public static final Calendar generateStartDateByYear(final int year) {
		
		Calendar startDate = Calendar.getInstance();
		startDate.set(Calendar.YEAR, year );
		startDate.set(Calendar.DAY_OF_YEAR, startDate.getActualMinimum(Calendar.DAY_OF_YEAR));
		
		return calculateMidnight(startDate);
	}
	
	/**
	 * Generate start date by {@link YearMonth}
	 * @return {@link Calendar} calendar the start date of the month in the year
	 */
	public static final Calendar generateStartDateByMonthAndYear(final YearMonth yearMonth) {
		return generateStartDateByMonthAndYear(yearMonth.getMonthValue(), yearMonth.getYear());
	}
	
	/**
	 * Generate end date by {@link YearMonth}
	 * @return {@link Calendar} calendar the start date of the month in the year
	 */
	public static final Calendar generateEndDateByMonthAndYear(final YearMonth yearMonth) {
		return generateEndDateByMonthAndYear(yearMonth.getMonthValue(), yearMonth.getYear());
	}
	
	/**
	 * generate the start date of the supplied month in the chosen year
	 *
	 * @param month starts from 1 {@link Month}
	 * @param year
	 * @return {@link Calendar} calendar the start date of the month in the year
	 */
	public static final Calendar generateStartDateByMonthAndYear(final int month, final int year) {
		
		Calendar calendar = Calendar.getInstance();
		calendar.set(year, month - 1, 0, 0, 0);
		calendar.set(Calendar.YEAR, year );
		calendar.set(Calendar.MONTH, month-1 );
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
	
		return calculateMidnight(calendar);
	}
	
	/**
	 * generate the end date of the supplied month in the chosen year
	 *
	 * @param month starts from 1 {@link Month}
	 * @param year
	 * @return {@link Calendar} calendar the end date of the month in the year
	 */
	public static final Calendar generateEndDateByMonthAndYear(final int month, final int year) {
		
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year );
		calendar.set(Calendar.MONTH, month-1 );
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		
		return calculateAbsoluteEndOfTheDay(calendar);
	}
	
	/**
	 * Get start of the month
	 * @param date
	 * @return
	 */
	public static final LocalDate getStartOfTheMonth(final LocalDate date) {
		return date.withDayOfMonth(1);
	}
	
	/**
	 * Get end of the month
	 * @param date
	 * @return
	 */
	public static final LocalDate getEndOfTheMonth(final LocalDate date) {
		return date.withDayOfMonth(date.lengthOfMonth());
	}
	
	/**
	 * Convert to {@link LocalDate}
	 * @param date
	 * @return
	 */
	public static final LocalDate convertToLocalDate(final Date date) {
		return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	}
	
	/**
	 * Convert to {@link Date}
	 * @param localDate
	 * @return
	 */
	public static final Date convertToDate(final LocalDate localDate) {
		return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
	}
	
	/**
	 * Convert to {@link Date}
	 * Converts string date supplied in the following format "dd/mm/yyyy/hh/mm
	 * @param stringDate
	 * @return
	 */
	public static final Date convertToDate(final String stringDate) {
		//if(stringDate.matches("\\d{2}\\/\\d{2}\\/\\d{4}\\/\\d{2}\\/\\d{2}")) {
		//	return null;
		//}
		
		String[] dateParts = stringDate.split("/");
		
		Calendar c = Calendar.getInstance();
		c.set(Calendar.YEAR, Integer.parseInt(dateParts[2]));
		c.set(Calendar.MONTH, Integer.parseInt(dateParts[1]));
		c.set(Calendar.DAY_OF_MONTH, Integer.parseInt(dateParts[0]));
		c.set(Calendar.HOUR_OF_DAY,Integer.parseInt( dateParts[3]));
		c.set(Calendar.MINUTE, Integer.parseInt(dateParts[4]));
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		
		return c.getTime();
	}
	
	/**
	 * Convert to {@link String}
	 * Converts supplied date in the following formatted string "yyyy-mm-ddThh:mm
	 * @param date
	 * @return
	 */
	public static final String convertToStringWithHoursAndMinutes(final Date date) {
		if(date == null ) return null;
		
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		
		return "" + 
		c.get(Calendar.YEAR) + "-" + 
		addZero(c.get(Calendar.MONTH)) + "-" + 
		addZero(c.get(Calendar.DAY_OF_MONTH)) + "T" + 
		addZero(c.get(Calendar.HOUR_OF_DAY)) + ":" + 
		addZero(c.get(Calendar.MINUTE));
	}
	
	/**
	 * Get lower date from two dates. The null is equal to infinity
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static final Date getLowerDateNullIsEqualToInfinity(final Date date1, final Date date2) {
		if (date1 == null && date2 == null) {
			return null;
		} else if (date1 == null && date2 != null) {
			return date2;
		} else if (date1 != null && date2 == null) {
			return date1;
		}
		
		return date1.before(date2) ? date1 : date2;
	}
	
	/**
	 * Get bigger date from two dates. The null is equal to infinity
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static final Date getBiggerDateNullisEqualToInfinity(final Date date1, final Date date2) {
		if (date1 == null && date2 == null) {
			return null;
		} else if (date1 == null && date2 != null) {
			return date1;
		} else if (date1 != null && date2 == null) {
			return date2;
		}
		
		return date1.after(date2) ? date1 : date2;
	}
	
	
	/**
	 * Helper method wich adds 0 if the supplied number is a single digit and covnert the supplied int into string
	 * @param number
	 * @return
	 */
	public static final String addZero(final int number) {
		return (number >= 0 && number <10)? String.format("%02d", number) : Integer.toString(number);
	}
}
