package com.kalin.large.core.model.article;

import com.kalin.large.core.model.user.User;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Article entity represents the basic data for each article type.
 */
@Entity
@Table(name = "ARTICLE")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Article implements Serializable {

        private static final long serialVersionUID = -8151031914842812595L;

        @Column(name = "ID_ARTICLE")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name="user", nullable = false)
        private User user;

        @Column(name = "TITLE", nullable = false)
        private String title;

        @Column(name = "SUBTITLE", nullable = true)
        private String subtitle;

        @Column(name = "START_DATE", nullable = false)
        private Date startDate;

        @Column(name = "END_DATE", nullable = false)
        private Date endDate;

        @Column(name = "BODY", nullable = false)
        @Type(type="text")
        private String body;

        @Column(name = "IMAGE_PATH", nullable = true)
        private String imagePath;
        
        @Column(name = "PINNED", nullable = false)
        private boolean pinned = false;

        @Column(name = "STATUS", nullable = false)
        @Enumerated(EnumType.STRING)
        private ArticleStatusEnum status;

        @OneToMany(mappedBy = "pk.article", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
        private Set<ArticleTag> tags = new LinkedHashSet<>(0);

        @OneToMany(mappedBy = "article", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
        private Set<ArticleFile> articleFiles = new LinkedHashSet<>(0);

		public Article() {
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getSubtitle() {
			return subtitle;
		}

		public void setSubtitle(String subtitle) {
			this.subtitle = subtitle;
		}

		public Date getStartDate() {
			return startDate;
		}

		public void setStartDate(Date startDate) {
			this.startDate = startDate;
		}

		public Date getEndDate() {
			return endDate;
		}

		public void setEndDate(Date endDate) {
			this.endDate = endDate;
		}

		public String getBody() {
			return body;
		}

		public void setBody(String body) {
			this.body = body;
		}

		public String getImagePath() {
			return imagePath;
		}

		public void setImagePath(String imagePath) {
			this.imagePath = imagePath;
		}

		public boolean isPinned() {
			return pinned;
		}

		public void setPinned(boolean pinned) {
			this.pinned = pinned;
		}

		public ArticleStatusEnum getStatus() {
			return status;
		}

		public void setStatus(ArticleStatusEnum status) {
			this.status = status;
		}

		public Set<ArticleTag> getTags() {
			return tags;
		}

		public void setTags(Set<ArticleTag> tags) {
			this.tags = tags;
		}

		public Set<ArticleFile> getArticleFiles() {
			return articleFiles;
		}

		public void setArticleFiles(Set<ArticleFile> articleFiles) {
			this.articleFiles = articleFiles;
		}
}
