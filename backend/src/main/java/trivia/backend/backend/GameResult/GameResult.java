package trivia.backend.backend.GameResult;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "game_result")
public class GameResult {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String username;

  private LocalDateTime playedAt;

  private String category;

  private String difficulty;

  private double score;

  @Lob
  @Column(name = "questions_json", columnDefinition = "TEXT")
  private String questionsJson;

  public GameResult() {
  }

  public GameResult(String username,
      LocalDateTime playedAt,
      String category,
      String difficulty,
      double score,
      String questionsJson) {
    this.username = username;
    this.playedAt = playedAt;
    this.category = category;
    this.difficulty = difficulty;
    this.score = score;
    this.questionsJson = questionsJson;
  }

  public Long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public LocalDateTime getPlayedAt() {
    return playedAt;
  }

  public void setPlayedAt(LocalDateTime playedAt) {
    this.playedAt = playedAt;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getDifficulty() {
    return difficulty;
  }

  public void setDifficulty(String difficulty) {
    this.difficulty = difficulty;
  }

  public double getScore() {
    return score;
  }

  public void setScore(double score) {
    this.score = score;
  }

  public String getQuestionsJson() {
    return questionsJson;
  }

  public void setQuestionsJson(String questionsJson) {
    this.questionsJson = questionsJson;
  }
}
