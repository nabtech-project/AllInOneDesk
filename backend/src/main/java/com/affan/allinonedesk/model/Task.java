package com.affan.allinonedesk.model;

import jakarta.persistence.Entity;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class Task extends BaseEntity {

    private String title;
    private LocalDateTime dueDate;
    private boolean completed;
}
