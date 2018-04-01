package com.kalin.large.core.model.articles;

import javax.persistence.*;
import java.io.Serializable;

/**
 * The Class Tag.
 *
 * @author Stoyan Dimitrov
 */
@Entity
@Table(name = "TAG")
public class Tag implements Serializable {
	private static final long serialVersionUID = 8813124260020047532L;

	/** The id. */
	@Id
	@Column(name = "ID_TAG")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	/** The name. */
	@Column(name = "NAME")
	private String name;

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Sets the name.
	 *
	 * @param name the new name
	 */
	public void setName(String name) {
		this.name = name;
	}

	
	
	
}
