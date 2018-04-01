package com.kalin.large.core.model.articles;

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


        @Column(name = "STATUS", nullable = false)
        @Enumerated(EnumType.STRING)
        private ArticleStatusEnum status;

        @OneToMany(mappedBy = "pk.article", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
        private Set<ArticleTag> tags = new LinkedHashSet<>(0);

        @OneToMany(mappedBy = "article", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
        private Set<ArticleFile> articleFiles = new LinkedHashSet<>(0);
}
