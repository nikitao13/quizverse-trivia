package trivia.backend.backend.GameResult;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameResultRepository
    extends JpaRepository<GameResult, Long> {
}
