package com.example.backend.controller;

import com.example.backend.model.Post;
import com.example.backend.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) {

        if (
            post.getStatus() == null ||
            post.getStatus().isBlank()
        ) {
            post.setStatus("PUBLISHED");
        }

        return postRepository.save(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(
            @PathVariable Long id,
            @RequestBody Post postDetails
    ) {

        Optional<Post> post =
                postRepository.findById(id);

        if (post.isPresent()) {

            Post existingPost = post.get();

            existingPost.setPlatform(
                    postDetails.getPlatform()
            );

            existingPost.setContent(
                    postDetails.getContent()
            );

            if (
                postDetails.getStatus() != null &&
                !postDetails.getStatus().isBlank()
            ) {
                existingPost.setStatus(
                        postDetails.getStatus()
                );
            }

            return ResponseEntity.ok(
                    postRepository.save(existingPost)
            );
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long id
    ) {

        if (postRepository.existsById(id)) {

            postRepository.deleteById(id);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }
}