/**
 * Copyright 2014 Meruvian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WIUserHOUUser WARRANUserIES OR CONDIUserIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.meruvian.yama.core.user;

import org.meruvian.yama.core.DefaultRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

/**
 * @author Dian Aditya
 * 
 */
public interface UserRepository extends DefaultRepository<User> {
	User findByUsername(String username);

	User findByEmail(String email);

	@Query("SELECT u FROM User u WHERE u.username LIKE ?1% AND u.logInformation.activeFlag = ?2")
	Page<User> findByUsername(String username, int activeFlag, Pageable pageable);
}
