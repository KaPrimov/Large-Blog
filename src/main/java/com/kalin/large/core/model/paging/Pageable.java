package com.kalin.large.core.model.paging;

/**
 * Helper class, which serves for pageable functionality
 */
public class Pageable {
	private final static int DEFAULT_DESIRED_PAGE = 0;
	private final static int DEFAULT_PAGE_SIZE = 20;
	
	protected int desiredPage = DEFAULT_DESIRED_PAGE;
	protected int pageSize = DEFAULT_PAGE_SIZE;
	protected boolean hasMoreItems = true;
	
	public int getDesiredPage() {
		return desiredPage;
	}
	
	public void setDesiredPage(int desiredPage) {
		this.desiredPage = desiredPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public boolean isHasMoreItems() {
		return hasMoreItems;
	}

	public void setHasMoreItems(boolean hasMoreItems) {
		this.hasMoreItems = hasMoreItems;
	}
	
	public void setDefaultDesiredPage() {
		this.desiredPage = DEFAULT_DESIRED_PAGE;
	}
}
