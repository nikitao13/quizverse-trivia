package trivia.backend.backend.GameResult;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class GameResultService {

  private final GameResultRepository repo;

  public GameResultService(GameResultRepository repo) {
    this.repo = repo;
  }

  public List<GameResult> findAll() {
    return repo.findAll();
  }

  public GameResult findById(Long id) {
    return repo.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "GameResult not found: " + id));
  }

  public GameResult save(GameResult incoming) {
    incoming.setPlayedAt(LocalDateTime.now());
    return repo.save(incoming);
  }

  public void delete(Long id) {
    repo.deleteById(id);
  }
}
