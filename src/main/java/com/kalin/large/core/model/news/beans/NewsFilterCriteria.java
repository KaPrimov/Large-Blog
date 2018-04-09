package com.kalin.large.core.model.news.beans;


import com.kalin.large.core.model.paging.Pageable;

public class NewsFilterCriteria extends Pageable {
	private String filterByTag;

	public String getFilterByTag() {
		return filterByTag;
	}

	public void setFilterByTag(String filterByTag) {
		this.filterByTag = filterByTag;
	}	
}
